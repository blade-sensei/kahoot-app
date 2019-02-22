import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByName(name) {
    return this.http.get(`http://localhost:3000/api/users/${name}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/current-user`);
  }
}
