import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  public username: string;
  public password: string;
  public errors: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {}

  onSubmitLogin() {
    const credentials = { username: this.username, password: this.password };
    const token = this.authenticationService.login(credentials);
    console.log(token);
    this.userService.getCurrentUser().subscribe((user: User) => {
      const redirectionPath = '/';
      this.router.navigate([redirectionPath]);

      if (!token) {
        const error = new Error('bad credentials');
        this.errors.push(error.message);
        this.router.navigate(['/login']);
      }
    });
  }
}
