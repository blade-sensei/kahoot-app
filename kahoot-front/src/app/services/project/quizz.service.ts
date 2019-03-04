import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class QuizzService {
  constructor(private http: HttpClient) {}

  addUserQuizz(id, quizz): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/users/${id}/quizz`, quizz);
  }
}
