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
  gameId;
  isAdmin;
  id = 0;
  game = {
    id: 0,
    players: []
  };

  gameChange: Subscription;
  constructor(
    private route: ActivatedRoute,
    private gameManager: GameManagerService,
  ) { }

  ngOnInit() {
    this.setGameChange();
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    console.log(this.gameId);
    this.isAdmin = this.route.snapshot.paramMap.get('isAdmin');
    const game  = this.route.snapshot.paramMap.get('game');
    console.log('param', game);
  }

  setGameChange() {
    this.gameChange = this.gameManager.getGameChange().subscribe(game => {
      console.log('changed game', game.game);
      this.game = game.game;
      this.id = game.game.id;
      console.log('game here', this.game);
    })
  }

}
