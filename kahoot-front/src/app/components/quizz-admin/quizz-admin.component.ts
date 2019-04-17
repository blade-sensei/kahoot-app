import {Component, OnInit, TemplateRef} from '@angular/core';
import {QuizzService} from "../../services/project/quizz.service";
import {ProfileService} from "../../services/profile/profile.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Socket} from "ngx-socket-io";
import {MapperGameManagerService} from "../../services/mapper-game-manager.service";
import {GameManagerService} from "../../services/game-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-quizz-admin',
  templateUrl: './quizz-admin.component.html',
  styleUrls: ['./quizz-admin.component.css'],
})
export class QuizzAdminComponent implements OnInit {
  userQuizz = [];
  headTable = ['title quizz', 'description', 'actions'];
  modalRef: BsModalRef;
  enableMobileGame = false;
  gameId = 0;
  //hooks
  connectionSubscription: Subscription;

  mapGames: Subscription;
  games = [];
  connected = false;

  constructor(
    private quizzService: QuizzService,
    private router: Router,
    private modalService: BsModalService,
    private socket: Socket,
    private mapperGM: MapperGameManagerService,
    private gameManagerService: GameManagerService,
  ) {
  }

  ngOnInit() {
    const { uid } = ProfileService.getCurrentUserToken();
    this.quizzService.getUserQuizz(uid).subscribe(quizzs => {
      this.userQuizz = quizzs;
    });
    this.setHooks();
    this.gameSub();
    // const socket = io('http://localhost:3000');
    // console.log(socket);

  }

  onDeleteQuizz(quizzToDelete) {
    console.log(quizzToDelete._id);
    this.quizzService.deleteQuizz(quizzToDelete._id).subscribe(res => {
      if (res.n >= 1) {
        this.userQuizz = this.userQuizz
          .filter(quizz => !(quizz._id === quizzToDelete._id));
      }
    });
  }

  onRedirectToEdit(quizzToEdit) {
    this.router.navigate(['/quizz/edit', quizzToEdit._id]);
  }

  openModalGameSettings(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createGameRoom() {
    //call api and get room numer
    this.gameManagerService.createRoomAdmin();
    //reset component
    this.enableMobileGame = false;
    this.modalRef.hide();
  }

  setHooks() {
    this.connectionSubscription = this.gameManagerService
      .getConnectionHook().subscribe(resp => {
        this.gameId = resp.gameId;
        console.log(this.gameId);
        if (!this.connected) {
          this.router.navigate(['/quizz/room', {isAdmin: true, gameId: this.gameId }]);
        }
        // creation d'un room socket io
      })
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  gameSub() {
    this.mapGames = this.mapperGM.onMapPinGameManager()
      .subscribe(games => {
        console.log(games);
        this.games = games;
      });
  }
}
