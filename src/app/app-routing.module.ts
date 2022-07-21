import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from '../app/modules/admin/pages';
import { QuestionnairComponent } from './modules/user/questionnair/questionnair.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
// import { AppnavigationComponent } from './modules/sharedmodule/appnavigation/appnavigation.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'admin',
    component: QuestionsComponent
  },
  {
    path: 'user',
    component: QuestionnairComponent
  },
  {
    path: 'about',
    component: AboutComponent
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
