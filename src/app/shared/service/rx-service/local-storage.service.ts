import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const BIN_KEY = 'bin_maps';
export const WS_KEY = 'order_service';

@Injectable({providedIn: 'root'})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platform: any) {
  }

  clear() {
    if (isPlatformBrowser(this.platform)) {
      localStorage.clear();
    }
  }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.removeItem(key);
    }
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem(key, value);
    }
  }
}
