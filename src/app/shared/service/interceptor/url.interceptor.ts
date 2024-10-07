import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ACCEPT, APP_JSON, CONTENT_TYPE} from './config/config';
import {environment} from '../../../../environments/environment';


@Injectable()
export class UrlInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('UrlInterceptor');
    let resultUrl: string = '';
    if ((!req.url.startsWith('http', 0))) {
      resultUrl += environment.url;
    }
    req = req.clone({
      headers: req.headers.set(CONTENT_TYPE, APP_JSON).set(ACCEPT, APP_JSON),
      url: resultUrl + req.url,
    });

    return next.handle(req);
  }

}
