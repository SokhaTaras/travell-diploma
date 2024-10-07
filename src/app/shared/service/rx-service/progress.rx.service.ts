import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({providedIn:'root'})
export class ProgressRxService {
  loader: number = 0;
  private _loader = new Subject<number>();
  loader$ = this._loader.asObservable();

  constructor() {
  }

  startLoader() {
    this.loader += 1;
    this._loader.next(this.loader);
  }

  endLoader() {
    this.loader -= 1;
    this._loader.next(this.loader);
  }
}
