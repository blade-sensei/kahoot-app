import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/question";

@Component({
  selector: 'app-quizz-create',
  templateUrl: './quizz-create.component.html',
  styleUrls: ['./quizz-create.component.css']
})
export class QuizzCreateComponent implements OnInit {
  quizz: any = {
    questions: [],
    title: '',
    owner: {}
  };
  quizzValidated = false;
  constructor() { }

  ngOnInit() {
  }

  onValidate() {
    this.quizzValidated = true;
    console.log('validate quizz');
  }

}
