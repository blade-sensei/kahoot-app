import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-answer-editor',
  templateUrl: './answer-editor.component.html',
  styleUrls: ['./answer-editor.component.css']
})
export class AnswerEditorComponent implements OnInit {
  @Input()
  quizz: any = {};
  constructor() { }

  ngOnInit() {
  }

}
