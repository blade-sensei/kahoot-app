import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizzService} from "../../services/project/quizz.service";

@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.component.html',
  styleUrls: ['./quizz-edit.component.css']
})
export class QuizzEditComponent implements OnInit {
  quizzId;
  quizzToSave;
  editingQuizz;

  headTable = ['title', 'answers', 'good answers', 'time', 'actions'];

  answerFormError = [];
  quizzFormError = [];

  isQuestionOnEdition = false;
  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
  ) { }

  ngOnInit() {
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.quizzService.getQuizz(this.quizzId).subscribe(quizz => {
      console.log(quizz);
      this.editingQuizz = quizz;
      console.log(this.editingQuizz);
    })
  }

  public getAnswers(question) {
    if (Reflect.has(question, 'answers')) {
      const answersTitle = question.answers.map(answer => answer.title);
      return answersTitle.join();
    }
    return '';
  }

  public getGoodAnswers(question) {
    return question.correctAnswers.join();
  }

}
