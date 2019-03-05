import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizzService} from "../../services/project/quizz.service";
import {Subscription} from "rxjs";
import {HookManagerService} from "../../services/hook-manager.service";

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

  questionToEdit: any;
  isQuestionOnEdition = false;
  indexQuestionEdit;

  questionSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
    private hook: HookManagerService,
  ) { }

  ngOnInit() {
    this.subscribeForQuestionEdited();
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.quizzService.getQuizz(this.quizzId).subscribe(quizz => {
      this.editingQuizz = quizz;
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

  editQuestion(questionToEdit) {
    this.indexQuestionEdit = this.editingQuizz.questions
      .indexOf(questionToEdit);
    this.hook.setQuestionToEdit(questionToEdit);
  }

  subscribeForQuestionEdited() {
    this.questionSubscription = this.hook
      .getQuestionEdited()
      .subscribe(question => {
        console.log(question);
        this.editingQuizz.questions[this.indexQuestionEdit] = JSON.parse(JSON.stringify(question));
      });
  }

}
