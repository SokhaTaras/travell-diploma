import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ENCTYPE, FORM_DATA_MULTIPART} from './config/config';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Injectable()
export class MultipartInterceptor implements HttpInterceptor {

  private reqIsMultipart(req: HttpRequest<any>) {
    try {
      let form:any= req.body;
      let values:Iterator<any>=form.values();
      let tmp:IteratorResult<any>;
      tmp=values.next();
      while (!tmp.done) {
        if (tmp.value instanceof File){
          return true;
        }
        tmp=values.next();
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.reqIsMultipart(req)) {
      let hh:HttpHeaders=req.headers.delete("Content-Type");
      console.log(hh.keys());
      req = req.clone({
        headers: hh.set(ENCTYPE, FORM_DATA_MULTIPART),
      });
    }
     return next.handle(req);
  }

}
