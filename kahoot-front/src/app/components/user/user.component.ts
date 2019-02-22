import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {}

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('username');
    this.setupUser(userName);
    this.profileService.setCurrentProfil(userName);
  }

  setupUser(name) {
    this.userService.getUserByName(name).subscribe(user => {
      this.user = user;
    });
  }
}
