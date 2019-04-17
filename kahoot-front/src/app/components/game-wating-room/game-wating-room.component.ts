import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {GameManagerService} from "../../services/game-manager.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-game-wating-room',
  templateUrl: './game-wating-room.component.html',
  styleUrls: ['./game-wating-room.component.css']
})
export class GameWatingRoomComponent implements OnInit {
  game;
  isAdmin;
  gameChange: Subscription;
  constructor(
    private route: ActivatedRoute,
    private gameManager: GameManagerService,
    private socket: Socket,
  ) { }

  ngOnInit() {
    this.game = {
      id: this.route.snapshot.paramMap.get('gameId'),
      playerName:  this.route.snapshot.paramMap.get('playerName'),
    };
    this.isAdmin = this.route.snapshot.paramMap.get('isAdmin') !== 'false';
    console.log(this.isAdmin);
    this.onGetGameState();
    this.emitGetGameState(this.game);
  }

  onGetGameState() {
    console.log(this.game.id);
    console.log('room_' + this.game.id);
    const listenTo = 'game_state_get_response';
    this.socket.on(listenTo, (game) => {
      console.log('receive gamestate', game);
      this.game = game;
    });
  }

  emitGetGameState(game) {
    this.gameManager.onEmitGetGameState(game)
  }

  isUserAdmin() {
    return this.isAdmin
  }

  isEnoughPlayer() {
    if (this.game.players) {
      return this.game.players.length > 1
    }
    return false;
  }

  startGame() {

  }

}
