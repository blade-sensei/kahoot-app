import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  login(credentials){
    const endpoint = 'http://localhost:3000/api/auth/login';
    return this.httpClient.post(endpoint, credentials).subscribe(
      (token: any) => {
      if (token && token.token) {
        localStorage.setItem('currentUser', JSON.stringify(token));
      }
      return token;
    });
  }
}
