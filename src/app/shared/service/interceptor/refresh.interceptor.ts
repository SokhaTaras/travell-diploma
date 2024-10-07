import {filter, finalize, take} from 'rxjs/operators';
import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {switchMap} from 'rxjs/operators/switchMap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserDetailsService} from '../user-details.service';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private _userDetailsService: UserDetailsService, private _router: Router, private _snackBar: MatSnackBar) {
  }

/*  open(u: string) {
    console.log(this._router.url.replace('(sign:sign/in)', '').replace('(sign:sign/up)', ''));
    this._router.navigate([
      '/',
      {
        outlets: {sign: ['sign', u]}
      }
    ], {
      queryParamsHandling: 'preserve'
    });
  }*/

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request, this._userDetailsService.getToken()))
      .catch(err => {
        if (err.status == 401) {
          if (this._userDetailsService.checkAuth()) {
            return this.handle401Error(request, next);
          } else {
            return throwError(err);
          }
        } else {
          return throwError(err);
        }
      });
    // .pipe(
    //   catchError(err => {
    //     if (err instanceof HttpErrorResponse) {
    //       switch ((<HttpErrorResponse>err).status) {
    //         case 401:
    //           return this.handle401Error(request, next);
    //         // case 400:
    //         // return <any>this._userDetailsService.logout();
    //       }
    //     }
    //     // } else {
    //     //   return Observable.throw(err);
    //     // }
    //   }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (this._userDetailsService.getToken() && !request.url.includes('/oauth/token')) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    } else {
      return request.clone();
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this._userDetailsService.refreshToken()
        .pipe(
          switchMap((user: any) => {
            if (user) {
              this._userDetailsService.tokenParseInLocalStorage(user);
              this.tokenSubject.next(user.access_token);
              return next.handle(this.addTokenToRequest(request, user.access_token));
            }

            // console.log('errror');
            // this._userDetailsService.logout();
            // return <any>this._userDetailsService.logout();
          }),
          // catchError(err => {
          //   console.log(err);
          //   this._userDetailsService.logout();
          //   return <any>this._userDetailsService.logout();
          // }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        ).catch(err => {
          this._userDetailsService.logout();
          console.log(err);
          return throwError(err);
        });
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
}
