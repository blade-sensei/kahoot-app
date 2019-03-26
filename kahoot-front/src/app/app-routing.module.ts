import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthFormComponent} from "./components/auth/auth-form/auth-form.component";
import {HomeComponent} from "./components/home/home.component";
import {QuizzAdminComponent} from "./components/quizz-admin/quizz-admin.component";
import {QuizzCreateComponent} from "./components/quizz-create/quizz-create.component";
import {QuizzEditComponent} from "./components/quizz-edit/quizz-edit.component";
import {GameWatingRoomComponent} from "./components/game-wating-room/game-wating-room.component";
import {GamePlayerJoinComponent} from "./components/game-player-join/game-player-join.component";

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: 'quizz/admin', component: QuizzAdminComponent },
  { path: 'quizz/create', component: QuizzCreateComponent },
  { path: 'quizz/edit/:id', component: QuizzEditComponent },
  { path: 'quizz/room', component: GameWatingRoomComponent },
  { path: 'quizz/join', component: GamePlayerJoinComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
