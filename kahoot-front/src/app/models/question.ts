import {Answser} from "./answser";


export class Question {
  title: string;
  answers: Answser[];

  constructor(answers) {
    this.title = '';
    this.answers = answers;
  }
}
