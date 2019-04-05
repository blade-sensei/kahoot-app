import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {GameManagerService} from "../../services/game-manager.service";

@Component({
  selector: 'app-game-wating-room',
  templateUrl: './game-wating-room.component.html',
  styleUrls: ['./game-wating-room.component.css']
})
export class GameWatingRoomComponent implements OnInit {
  game;
  gameChange: Subscription;
  constructor(
    private route: ActivatedRoute,
    private gameManager: GameManagerService,
  ) { }

  ngOnInit() {
    this.onGetGameState();
    this.game = {
      id: this.route.snapshot.paramMap.get('gameId'),
      isAdmin: Boolean(this.route.snapshot.paramMap.get('isAdmin')),
      playerName:  this.route.snapshot.paramMap.get('playerName'),
    };
    console.log('game settings', this.game.isAdmin);
    this.emitGetGameState(this.game);
  }

  onGetGameState() {
    this.gameChange = this.gameManager.getGameState().subscribe(game => {
      console.log(game);
      this.game = game;
      console.log('game here', this.game);
    })
  }

  emitGetGameState(game) {
    this.gameManager.onEmitGetGameState(game)
  }

}
