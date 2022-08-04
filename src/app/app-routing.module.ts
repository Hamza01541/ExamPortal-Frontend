import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from '../app/modules/admin/pages';
import { QuestionnairComponent } from './modules/user/questionnair/questionnair.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { UserTabComponent } from './modules/user/user-tab/user-tab.component';
import { AuthGuard } from './shared/services/auth.guard';
// import { AppnavigationComponent } from './modules/sharedmodule/appnavigation/appnavigation.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren : () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'user',
    component: QuestionnairComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'addUserTab',
    component: UserTabComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
