import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  private connectionSuccess$ = new Subject<any>();

  constructor(
    private socket: Socket,
    private gameId: String
  ) {
    this.setConnectionHook()
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  setConnectionHook() {
    this.socket.on('connectionSucess', (res) => {
      res.gameId = this.getRandomInt(20);
      this.connectionSuccess$.next(res);
    });
  }

  getConnectionHook(): Observable<any> {
    return this.connectionSuccess$.asObservable();
  }

  connect() {
    this.socket.connect();
  }

}
