import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {isNull, isNullOrUndefined} from 'util';
import {UserDetailsService} from '../user-details.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {LocalStorageService} from "../rx-service/local-storage.service";
import {environment} from '../../../../environments/environment';

const BASIC = 'Basic  bXktY2xpZW50Om15LXNlY3JldA==';
const BEARER = 'Bearer ';
const CONTENT_TYPE = 'Content-Type';
const AUTHORIZATION = 'Authorization';
const ACCEPT = 'Accept';
const ENCTYPE = 'enctype';
const APP_JSON = 'application/json';
const APP_FORM = 'application/x-www-form-urlencoded';
const FORM_DATA_MULTIPART = 'form-data/multipart';
const GRANT_TYPE = 'grant_type';
const TEXT_PLAIN = 'text/plain';
const access_token="access_token";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _router: Router, private _userDetailsService: UserDetailsService, private _localStorageService: LocalStorageService) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    let headers = this.getHeaders(req);
    req = req.clone({headers: headers, url: environment.url + req.url});
    return next.handle(req).do(x => {
        // console.warn(x);
      }, error => {
        // console.warn(error);
      }
    ).pipe(catchError(err => {
      console.log(err);
      if (err.status === 401) {
        if (this._userDetailsService.checkAuth()) {
          this._userDetailsService.logout();
        }
      } else if (err.status == 0) {
        // console.warn("----------0-------------");
        // setTimeout(()=>{
        //   location.reload();
        // },5000)
        return throwError(err);
      } else {
        return throwError(err);
      }
    }));
  }

  private getHeaders(req: HttpRequest<any>): HttpHeaders {

    let authKey: string;
    let headers = new HttpHeaders();
    let temp: HttpRequest<any>;

    if (isNull(req.headers)) {
      temp = req.clone({headers: headers});
    } else {
      temp = req.clone();
    }

    if (temp.headers.keys().indexOf(ENCTYPE) != -1) {
      headers = headers.set(ENCTYPE, FORM_DATA_MULTIPART);
    } else {
      if (temp.params.get(GRANT_TYPE) != null) {
        authKey = BASIC;
        headers = headers.set(CONTENT_TYPE, [APP_FORM, APP_JSON]);
      } else if (!isNullOrUndefined(this._localStorageService.getItem(access_token)) && this._localStorageService.getItem(access_token) != '') {
        authKey = BEARER + this._localStorageService.getItem(access_token);
      }
      if (headers.keys().indexOf(CONTENT_TYPE) != -1) {
        if (headers.get(CONTENT_TYPE).indexOf(TEXT_PLAIN) == -1) {
          if (headers.get(CONTENT_TYPE).indexOf(APP_JSON) == -1) {
            headers = headers.set(CONTENT_TYPE, [temp.headers.get(CONTENT_TYPE), APP_JSON]);
          }
        } else {
          headers = headers.append(CONTENT_TYPE, TEXT_PLAIN);
        }
      } else {
        headers = headers.set(CONTENT_TYPE, APP_JSON);
      }
      headers = headers.set(AUTHORIZATION, authKey);
    }
    headers = headers.set(ACCEPT, APP_JSON);
    return headers;
  }
}
