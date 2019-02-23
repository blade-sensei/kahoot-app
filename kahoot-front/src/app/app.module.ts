import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {AuthFormComponent} from "./components/auth/auth-form/auth-form.component";
import {UserService} from "./components/user/user.service";
import {MenuComponent} from "./components/menu/menu.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthenticationService} from "./components/auth/authentication.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProfileService} from "./services/profile/profile.service";
import {AuthInterceptorService} from "./services/authentication/auth-interceptor.service";
import { QuizzAdminComponent } from './components/quizz-admin/quizz-admin.component';
import { ButtonQuizzAddComponent } from './components/button-quizz-add/button-quizz-add.component';
import { QuizzCreateComponent } from './components/quizz-create/quizz-create.component';
import { AnswerEditorComponent } from './components/answer-editor/answer-editor.component';
import { QuestionEditorComponent } from './components/question-editor/question-editor.component';
import { GameScreenAdminComponent } from './components/game-screen-admin/game-screen-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    MenuComponent,
    HomeComponent,
    QuizzAdminComponent,
    ButtonQuizzAddComponent,
    QuizzCreateComponent,
    AnswerEditorComponent,
    QuestionEditorComponent,
    GameScreenAdminComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
