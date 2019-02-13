import { CollectionsComponent } from './collections/collections.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'collections',
    component: CollectionsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
