import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserDetailsService} from '../user-details.service';
import {AuthInterceptorService} from './auth-interceptor.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AUTHORIZATION, BEARER} from './config/config';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _userDetailsService: UserDetailsService) {

  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    // console.log('AuthenticationInterceptor');
    // if (this._userDetailsService.checkAuth()) {
    //   req = req.clone({
    //     headers: req.headers.set(AUTHORIZATION, BEARER(this._userDetailsService.getToken()))
    //   });
    // }
    /*else {
      console.log(req);
      console.log(req.url);
      console.log(req.headers);
      console.log(JSON.stringify(req.headers));
      console.log(JSON.stringify(req.headers.keys()));
    }*/
    return next.handle(req);
  }

}
