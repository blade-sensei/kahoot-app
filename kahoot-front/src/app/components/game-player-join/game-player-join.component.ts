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
  playerConnection: Subscription;
  constructor(
    private mapp: MapperGameManagerService,
    private gameService: GameManagerService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  connectToGame() {
    this.connection();
    this.gameService.connectPlayer(this.data);
  }

  connection() {
    this.playerConnection = this.gameService.getConnectionPlayerResponse()
      .subscribe(response => {
        console.log('player connection response', response);
        if (response.success) {
          this.router.navigate(['/quizz/room', {isAdmin: false, gameId: response.gameId, playerName: this.data.playerName}]);
        } else {
          console.log('connection player failed');
        }
    });
  }

}
