import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HookManagerService {

  private questionEdited$ = new Subject<any>();
  private questionToEdit$ = new Subject<any>();

  constructor() { }

  setQuestionEdited(project: any) {
    this.questionEdited$.next(project);
  }

  getQuestionEdited(): Observable<any> {
    return this.questionEdited$.asObservable();
  }

  setQuestionToEdit(project: any) {
    this.questionToEdit$.next(project);
  }

  getQuestionToEdit(): Observable<any> {
    return this.questionToEdit$.asObservable();
  }

}
