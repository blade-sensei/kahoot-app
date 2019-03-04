import { Component, OnInit } from '@angular/core';
import {QuizzService} from "../../services/project/quizz.service";
import {ProfileService} from "../../services/profile/profile.service";

@Component({
  selector: 'app-quizz-admin',
  templateUrl: './quizz-admin.component.html',
  styleUrls: ['./quizz-admin.component.css']
})
export class QuizzAdminComponent implements OnInit {
  userQuizz = [];
  headTable = ['title quizz', 'description', 'actions'];
  constructor(
    private quizzService: QuizzService,

  ) { }

  ngOnInit() {
    const { uid } = ProfileService.getCurrentUserToken();
    this.quizzService.getUserQuizz(uid).subscribe(quizzs => {
      this.userQuizz = quizzs;
    });
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

}
