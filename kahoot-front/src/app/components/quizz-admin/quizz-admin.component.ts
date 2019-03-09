import {Component, OnInit, TemplateRef} from '@angular/core';
import {QuizzService} from "../../services/project/quizz.service";
import {ProfileService} from "../../services/profile/profile.service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import io from 'socket.io-client';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-quizz-admin',
  templateUrl: './quizz-admin.component.html',
  styleUrls: ['./quizz-admin.component.css']
})
export class QuizzAdminComponent implements OnInit {
  userQuizz = [];
  headTable = ['title quizz', 'description', 'actions'];
  modalRef: BsModalRef;
  enableMobileGame = false;
  constructor(
    private quizzService: QuizzService,
    private router: Router,
    private modalService: BsModalService,
    private socket: Socket,
  ) { }

  ngOnInit() {
    const { uid } = ProfileService.getCurrentUserToken();
    this.quizzService.getUserQuizz(uid).subscribe(quizzs => {
      this.userQuizz = quizzs;
    });

    // const socket = io('http://localhost:3000');
    // console.log(socket);
    this.socket.connect();

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
    console.log('room created');
    this.enableMobileGame = false;
    this.modalRef.hide();
  }

}
