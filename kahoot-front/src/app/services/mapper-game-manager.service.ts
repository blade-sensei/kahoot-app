import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapperGameManagerService {

  private mapPinGameManager = new Subject<any>();

  public gamesId = [];

  constructor() { }

  addGame(game) {
    this.gamesId.push(game);
    console.log(this.gamesId);
  }

  onMapPinGameManager(): Observable<any>  {
    return this.mapPinGameManager.asObservable();
  }

  setMapPingGameManager(tuple) {
    this.gamesId.push(tuple);
    console.log(this.gamesId);
    this.mapPinGameManager.next(this.gamesId);
  }

  getGames() {
    return this.gamesId;
  }

  static forRoot() {

  }
}
