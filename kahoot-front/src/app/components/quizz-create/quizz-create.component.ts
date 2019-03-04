import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/question";
import {QuizzService} from "../../services/project/quizz.service";
import {ProfileService} from "../../services/profile/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quizz-create',
  templateUrl: './quizz-create.component.html',
  styleUrls: ['./quizz-create.component.css']
})
export class QuizzCreateComponent implements OnInit {
  quizz: any = {
    description: '',
    questions: [],
    title: '',
    owner: {}
  };
  correctAnswers = [];

  // question section
  question: Question = new Question();
  headTable = ['title', 'answers', 'good answers', 'time', 'actions'];

  answerFormError = [];
  quizzFormError = [];


  constructor(
    private quizzService: QuizzService,
    private router: Router
  ) {
    this.initCorrectAnswers();
  }

  ngOnInit() {
  }

  onValidateQuizz() {
    if (!this.quizz.title || !this.quizz.description) {
      this.quizzFormError.push('Add a title or description');
      return;
    }
    const user = ProfileService.getCurrentUserToken();
    this.quizzService.addUserQuizz(user.uid, this.quizz)
      .subscribe(quizz => {
        console.log(quizz)
        const redirectionPath = '/quizz/admin';
        this.router.navigate([redirectionPath]);
      });

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

  onAddQuestion() {
    this.answerFormError = [];
    if (!this.question.title) {
      this.answerFormError.push('require title');
    }
    if (!this.question.time) {
      this.answerFormError.push('require time');
    }

    if (this.getInsertedAnswers().length < 2) {
      this.answerFormError.push('insert 2 responses at least');
    }

    if (!this.correctAnswers.some(answer => answer === true)) {
      this.answerFormError.push('insert 1 correct answers at least');
    }

    if (this.answerFormError.length <= 0) {
      this.question.answers = this.getInsertedAnswers();
      this.question.correctAnswers = this.getSelectedAnswers();
      this.quizz.questions.push(this.question);
      this.question = new Question();
      this.initCorrectAnswers();
    }
  }

  getSelectedAnswers() {
    const answers = [];
    this.correctAnswers.forEach((checkedAnswser, index) => {
      if (checkedAnswser) {
        answers.push(this.question.answers[index].title);
      }
    });
    return answers;
  }

  initCorrectAnswers() {
    this.correctAnswers = [false, false, false, false];
  }

  isSelectionAnswerDisabled(answer) {
    return answer.title;
  }

  getInsertedAnswers() {
    return this.question.answers.filter(answer => {
      if (answer.title) {
        return answer;
      }
    })
  }

  deleteQuestion(questionToDelete) {
   this.quizz.questions = this.quizz.questions
     .filter(question => !(questionToDelete.title === question.title));
  }
}
