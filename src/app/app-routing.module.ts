import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [{
  path: "",
  component: HomeComponent
}, {
  path: "login",
  component: LoginComponent
}, {
  path: "register",
  component: RegisterUserComponent
}, {
  path: "foo",
  component: RegisterUserComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
