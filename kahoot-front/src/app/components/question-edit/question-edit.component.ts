import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HookManagerService} from "../../services/hook-manager.service";
import {Subscription} from "rxjs";
import {Question} from "../../models/question";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnChanges {

  question: any;
  questionToEdit = new Question();

  answerFormError = [];

  questionSubscription: Subscription;
  actionCreate: boolean = true;

  constructor(
    private hook: HookManagerService,
  ) { }

  ngOnInit() {
    this.subscribeForQuestionToEdit();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.questionToEdit = JSON.parse(JSON.stringify(this.question));
  }

  onSaveEdition() {
    this.question = this.questionToEdit;
    this.hook.setQuestionEdited({question: this.question, create: this.actionCreate});
    this.question = undefined;
    this.questionToEdit = new Question();
    this.actionCreate = true;
  }

  subscribeForQuestionToEdit() {
    this.questionSubscription = this.hook
      .getQuestionToEdit()
      .subscribe(resp  => {
        this.actionCreate = resp.create;
        this.questionToEdit = JSON.parse(JSON.stringify(resp.question));
      });
  }

  isSelectionAnswerDisabled(answer) {
    return answer.title;
  }

  getSelectedAnswers(question) {
    const answers = [];
    question.correctAnswers.forEach((checkedAnswser, index) => {
      if (checkedAnswser) {
        answers.push(this.question.answers[index].title);
      }
    });
    return answers;
  }



}
