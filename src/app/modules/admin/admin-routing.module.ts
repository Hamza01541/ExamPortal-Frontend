import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './pages';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireListComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
