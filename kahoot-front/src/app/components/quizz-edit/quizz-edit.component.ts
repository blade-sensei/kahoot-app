import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizzService} from "../../services/project/quizz.service";
import {Subscription} from "rxjs";
import {HookManagerService} from "../../services/hook-manager.service";
import {ProfileService} from "../../services/profile/profile.service";

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
    private router: Router
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
      const answers = question.answers.filter(answer => answer.title);
      console.log(answers);
      const answersTitle = answers.map(answer => answer.title);
      return answersTitle.join();
    }
    return '';
  }

  public getGoodAnswers(question) {
    const correctAnswers = this.getSelectedAnswers(question);
    return correctAnswers.join();
  }

  getSelectedAnswers(question) {
    const answers = [];
    question.correctAnswers.forEach((checkedAnswser, index) => {
      if (checkedAnswser) {
        answers.push(question.answers[index].title);
      }
    });
    return answers;
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

  deleteQuestion(questionToDelete) {
    this.editingQuizz.questions = this.editingQuizz.questions
      .filter(question => !(questionToDelete.title === question.title));
  }

  onValidateQuizz() {
    if (!this.editingQuizz.title || !this.editingQuizz.description) {
      this.quizzFormError.push('Add a title or description');
      return;
    }
    this.quizzService.updateQuizz(this.editingQuizz._id, this.editingQuizz)
      .subscribe(quizz => {
        console.log(quizz)
        const redirectionPath = '/quizz/admin';
        this.router.navigate([redirectionPath]);
      });

  }

}
