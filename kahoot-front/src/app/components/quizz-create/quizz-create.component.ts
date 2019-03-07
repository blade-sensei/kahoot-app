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

  // question section
  question: Question = new Question();
  headTable = ['title', 'answers', 'good answers', 'time', 'actions'];

  answerFormError = [];
  quizzFormError = [];

  constructor(
    private quizzService: QuizzService,
    private router: Router
  ) {
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

    if (!this.question.correctAnswers.some(answer => answer === true)) {
      this.answerFormError.push('insert 1 correct answers at least');
    }

    if (this.answerFormError.length <= 0) {
      this.quizz.questions.push(this.question);
      this.question = new Question();
    }
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
