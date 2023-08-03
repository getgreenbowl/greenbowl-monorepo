import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  keys = {
    token: 'gb',
    mode: 'mode',
    archiveMenu: 'archive-menu',
  } as const;

  get(key: keyof typeof this.keys) {
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
      console.log(`Local Storage Service KEY: ${key}`, error);
      return null;
    }
  }

  remove(key: keyof typeof this.keys) {
    try {
      window.localStorage.removeItem(this.keys[key]);
      return true;
    } catch (error) {
      console.log(`Local Storage Service KEY: ${key}`, error);
      return null;
    }
  }
}
