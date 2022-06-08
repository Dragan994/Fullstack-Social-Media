import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { MainViewComponent } from './mainView/main-view.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ColorTesterComponent } from './color-tester/color-tester.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainViewComponent},
  {path: 'updateUser', component: UpdateUserComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {
    path: 'userProfile/:id',
    component: UserProfileComponent
  
  },
  {path: 'colorTester', component: ColorTesterComponent},
  {path: '', component: LoginComponent },
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
