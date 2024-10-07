import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MainLoaderRxService {
  loader: number = 0;
  private _loader = new Subject<number>();
  loader$ = this._loader.asObservable();

  constructor() {
  }

  startLoader() {
    this.loader = 1;
    this._loader.next(this.loader);
  }

  endLoader() {
    this.loader = 0;
    this._loader.next(this.loader);
  }
}
