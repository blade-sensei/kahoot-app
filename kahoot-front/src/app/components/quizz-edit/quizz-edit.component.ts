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
  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
  ) { }

  ngOnInit() {
    this.quizzId = this.route.snapshot.paramMap.get('id');
    this.quizzService.updateQuizz.subscribe(quizz => {

    })
  }

}
