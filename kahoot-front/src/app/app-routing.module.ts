import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthFormComponent} from "./components/auth/auth-form/auth-form.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
