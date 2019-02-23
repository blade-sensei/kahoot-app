import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-button-quizz-add',
  templateUrl: './button-quizz-add.component.html',
  styleUrls: ['./button-quizz-add.component.css']
})
export class ButtonQuizzAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openQuizzEditor() {
    this.router.navigate(['/quizz/create']);
  }

}
