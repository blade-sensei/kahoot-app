import { Component, OnInit } from '@angular/core';
import {MapperGameManagerService} from "../../services/mapper-game-manager.service";
import {Subscription} from "rxjs";
import {GameManagerService} from "../../services/game-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data = {
    pin: 0
  };
  mapGames: Subscription;
  constructor(
    private mapp: MapperGameManagerService,
    private gameService: GameManagerService,
  ) {}

  ngOnInit() {
  }

  connectToGame() {
    this.gameService.connectPlayer(this.data);
  }
}
