import { Component, OnInit } from '@angular/core';
import {MapperGameManagerService} from "../../services/mapper-game-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public game = [];
  mapGames: Subscription;
  constructor(
    private mapp: MapperGameManagerService,
  ) {}

  ngOnInit() {
    this.gameSub();
  }

  gameSub() {
    this.mapGames = this.mapp.onMapPinGameManager()
      .subscribe(games => {
        console.log('test');
        console.log(games);
        this.game = games;
      });
  }
}
