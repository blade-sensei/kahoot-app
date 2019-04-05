import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  private connectionSuccess$ = new Subject<any>();
  private playerConnectionSuccess$ = new Subject<any>();
  private gameChange$ = new Subject<any>();
  private gameState$ = new Subject<any>();

  constructor(
    private socket: Socket,
  ) {
    this.setConnectionHook()
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  setConnectionHook() {
    this.socket.on('connectionSucess', (res) => {
      this.connectionSuccess$.next(res);
    });

    this.socket.on('playerConnectionResponse', (res) => {
      console.log(res);
      this.playerConnectionSuccess$.next(res);
    });

    this.socket.on('setGameChange', (game) => {
      this.gameChange$.next(game);
    });

    this.socket.on('gameState', (game) => {
      console.log('receive gamestate', game);
      this.gameState$.next(game);
    })

  }

  getConnectionHook(): Observable<any> {
    return this.connectionSuccess$.asObservable();
  }

  getPlayerConnection(): Observable<any> {
    return this.playerConnectionSuccess$.asObservable();
  }

  getGameChange(): Observable<any> {
    return this.gameChange$.asObservable();
  }

  getGameState(): Observable<any> {
    return this.gameState$.asObservable();
  }

  onEmitGetGameState(game) {
    this.socket.emit('onGetGameState', game)
  }

  connect() {
    this.socket.emit('admin', {});
  }

  connectPlayer(pin) {
    this.socket.emit('playerConnection', pin);
  }

  onGameChange() {
    this.socket.on('onGameChange', (game) => {
      console.log(game)
    });
  }

  setGameChange(game) {
    this.socket.emit('setGameChange', game);
  }

}
