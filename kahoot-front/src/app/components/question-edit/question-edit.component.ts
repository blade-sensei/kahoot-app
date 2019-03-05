import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HookManagerService} from "../../services/hook-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnChanges {

  question: any;
  questionToEdit;

  questionSubscription: Subscription;
  constructor(
    private hook: HookManagerService,
  ) { }

  ngOnInit() {
    this.subscribeForQuestionToEdit();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.question.currentValue);
    this.questionToEdit = JSON.parse(JSON.stringify(this.question));
  }

  onSaveEdition() {
    this.question = this.questionToEdit;
    this.hook.setQuestionEdited(this.question);
  }

  subscribeForQuestionToEdit() {
    this.questionSubscription = this.hook
      .getQuestionToEdit()
      .subscribe(question => {
        this.questionToEdit = JSON.parse(JSON.stringify(question));
      });
  }


}
