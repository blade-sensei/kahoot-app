import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  @Input()
  quizz: any = {};

  headTable = ['title', 'answers', 'correct answser', 'actions'];
  correctAnswers = [true, false, false, false];
  questionToAdd = {} ;
  constructor() { }

  ngOnInit() {
    this.questionToAdd = new Question([]);
  }

  getCorrectAnswers() {

  }
  getAnswers(question) {
    if (Reflect.has(question, 'answers')) {
      return question.answers.join();
    }
    return '';
  }

  onAddQuestion() {
    this.quizz.questions.push(this.questionToAdd);
    this.questionToAdd = new Question([]);
  }

}
