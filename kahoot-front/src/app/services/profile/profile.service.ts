import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileService {
  private currentProfile$ = new Subject<string>();
  currentUser: User = new User();
  constructor() {}

  static getCurrentUserToken() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  static logout() {
    localStorage.removeItem('currentUser');
  }

  static isUserLogged(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.logged;
    }
    return false;
  }

  getCurrentProfil() {
    return this.currentProfile$.asObservable();
  }

  setCurrentProfil(profil: string) {
    this.currentProfile$.next(profil);
  }
}
