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
    this.listenSocketIOServerEvents()
  }

  listenSocketIOServerEvents() {
    this.socket.on('create_room_response', (res) => {
      this.connectionSuccess$.next(res);
    });

    this.socket.on('join_response_player', (res) => {
      this.playerConnectionSuccess$.next(res);
    });

    this.socket.on('game_change', (game) => {
      this.gameChange$.next(game);
    });

    this.socket.on('game_state_get_response', (game) => {
      console.log('receive gamestate', game);
      this.gameState$.next(game);
    })

  }

  getConnectionHook(): Observable<any> {
    return this.connectionSuccess$.asObservable();
  }

  getGameChange(): Observable<any> {
    return this.gameChange$.asObservable();
  }

  getGameState(): Observable<any> {
    return this.gameState$.asObservable();
  }

  onEmitGetGameState(game) {
    this.socket.emit('game_state_get', game)
  }

  createRoomAdmin() {
    this.socket.emit('create_room_admin', {});
  }

  connectPlayer(pin) {
    this.socket.emit('join_room_player', pin);
  }

}
