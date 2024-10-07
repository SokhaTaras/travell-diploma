import {Injectable} from '@angular/core';
// import {User} from '../models/user';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BASIC} from './interceptor/config/config';
import {LocalStorageService} from './rx-service/local-storage.service';
import {User} from "./model/user.model";

@Injectable()
export class UserDetailsService {

  static pingInfo: boolean = false;
  public user: User;
  public isAuth: boolean = false;
  public service: boolean = true;
  time: Date;
  private _user = new Subject<User>();
  user$ = this._user.asObservable();
  private _isAuth = new Subject<boolean>();
  isAuth$ = this._isAuth.asObservable();
  private _service = new Subject<boolean>();
  service$ = this._service.asObservable();

  constructor(private _httpClient: HttpClient, private _router: Router,
              private _localStorageService: LocalStorageService) {
    console.warn('init UDS');
    if (this.checkAuth()) {
      this.ping();
      this.user = this.getUser();
      this._user.next(this.user);
    }
  }

  getPingInfo(): boolean {
    return this._localStorageService.getItem('ping') == 'true';
  }

  getTimes(value) {
    if (value < 60) {
      if (value < 10) {
        return '0:0' + value;
      }
      return '0:' + value;
    } else {
      if (value % 60 < 10) {
        return ((value - value % 60) / 60) + ':0' + value % 60;
      }
      return ((value - value % 60) / 60) + ':' + value % 60;
    }
  }

  ping() {
    if (this.checkAuth() && !UserDetailsService.pingInfo) {
      console.warn('init ping');
      UserDetailsService.pingInfo = true;
    }
  }

  reloadUser() {

  }

  getUser(): User {
    return (<User>JSON.parse(this._localStorageService.getItem('user')));
  }

  public login(user: User) {
    this.user = user;
    this._localStorageService.setItem('user', JSON.stringify(user));
    this._user.next(this.user);
    this.isAuth = true;
    this._isAuth.next(this.isAuth);
    // localStorage.setItem('EMAIL', user.mail.toUpperCase());
    this._localStorageService.setItem('user', JSON.stringify(user));
    if (this.checkAuth() && !UserDetailsService.pingInfo) {
      this.ping();
    }
  }

  public logout() {
    this._localStorageService.removeItem('access_token');
    this.user = null;
    this.isAuth = false;
    this._localStorageService.removeItem('ROLE');
    this._localStorageService.removeItem('user');
    this._user.next(this.user);
    this._isAuth.next(this.isAuth);
    this._router.navigateByUrl('/');
  }

  open(u: string) {
    console.log(this._router.url.replace('(sign:sign/in)', '').replace('(sign:sign/up)', ''));
    console.error('open UDS');
    this._router.navigate([
      '/',
      {
        outlets: {sign: ['sign', u]}
      }
    ], {
      queryParamsHandling: 'preserve',
      preserveQueryParams: true
    });
  }

  checkAuth(): boolean {
    return (!isNullOrUndefined(this.getToken()));
  }

  getToken(): string {
    return this._localStorageService.getItem('access_token');
  }

  getTokenElement(key): string {
    return this._localStorageService.getItem(key);
  }

  getRefreshToken(): string {
    return this._localStorageService.getItem('refresh_token');
  }

  refreshToken(): Observable<any> {
    let data = 'refresh_token='
      + encodeURIComponent(this.getRefreshToken()) + '&grant_type=refresh_token&client_id=' +
      encodeURIComponent('admin-client') + '&client_secret=' + encodeURIComponent('123456');
    return this._httpClient.post<any>('/oauth/token?' + data, null, {headers: {Authorization: `${BASIC}`}})
      .pipe(
        map(user => {
          return <any>user;
        }),
      );
  }

  tokenParseInLocalStorage(data: any) {
    this._localStorageService.removeItem('access_token');
    this._localStorageService.removeItem('token_type');
    this._localStorageService.removeItem('expires_in');
    this._localStorageService.removeItem('scope');
    this._localStorageService.removeItem('jti');
    this._localStorageService.removeItem('refresh_token');


    this._localStorageService.setItem('access_token', data.access_token);
    this._localStorageService.setItem('token_type', data.token_type);
    this._localStorageService.setItem('expires_in', new Date().setSeconds(data.expires_in) + '');
    this._localStorageService.setItem('scope', data.scope);
    this._localStorageService.setItem('jti', data.jti);
    this._localStorageService.setItem('refresh_token', data.refresh_token);
  }


}
