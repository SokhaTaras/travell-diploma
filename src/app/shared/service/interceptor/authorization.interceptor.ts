import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {APP_FORM, APP_JSON, AUTHORIZATION, BASIC, CONTENT_TYPE, OAUTH_TOKEN_PATH} from './config/config';
import {HttpMethod} from './config/HttpMethod';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('AuthorizationInterceptor');
    if ((req.url.includes(OAUTH_TOKEN_PATH)|| req.url == OAUTH_TOKEN_PATH) && req.method == HttpMethod.POST) {
      req = req.clone({
        headers: req.headers
          .set(AUTHORIZATION, BASIC)
          .set(CONTENT_TYPE, [APP_JSON, APP_FORM]),
      });
    }
 /*   console.log(req);
    console.log(req.url);
    console.log(req.headers);
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.headers.keys()));*/
    return next.handle(req);
  }

}
