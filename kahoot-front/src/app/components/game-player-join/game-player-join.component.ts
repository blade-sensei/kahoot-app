import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {MapperGameManagerService} from "../../services/mapper-game-manager.service";
import {GameManagerService} from "../../services/game-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-player-join',
  templateUrl: './game-player-join.component.html',
  styleUrls: ['./game-player-join.component.css']
})
export class GamePlayerJoinComponent implements OnInit {

  data = {
    pin: 0,
    playerName: ''
  };
  mapGames: Subscription;
  playerConnection: Subscription;
  constructor(
    private mapp: MapperGameManagerService,
    private gameService: GameManagerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.connection();
  }

  connectToGame() {
    this.gameService.connectPlayer(this.data);
  }

  connection() {
    this.playerConnection = this.gameService.getGameChange().subscribe(response => {
      console.log('game after change', response);
      this.router.navigate(['/quizz/room', {isAdmin: false, gameId: response.gameId, game: response.game}]);
    });
  }

}
