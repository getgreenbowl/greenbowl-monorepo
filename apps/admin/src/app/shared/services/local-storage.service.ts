import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  keys = {
    token: 'gb'
  } as const;


  get(key: keyof typeof this.keys ) {
    const data = window.localStorage.getItem(this.keys[key]);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  set(key: keyof typeof this.keys, data: unknown) {
    try {
      window.localStorage.setItem(this.keys[key], JSON.stringify(data));
      return true;
    } catch (error) {
      console.log(`Local Storage Service KEY: ${key}`,error);
      return null;
    }
  }
}
