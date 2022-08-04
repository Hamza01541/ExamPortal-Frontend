import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { AdminRoutingModule } from './admin-routing.module';
import { QuestionsComponent } from './pages';
import { ButtonModule } from 'primeng/button';
import { AddQuestionModalComponent, QuestionsListComponent } from './components';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import { ViewResultComponent } from './components/view-result/view-result.component';




@NgModule({
  declarations: [
    QuestionsComponent,
    AddQuestionModalComponent,
    QuestionsListComponent,
    QuestionnaireListComponent,
    ViewResultComponent
    // AppnavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    TableModule,
    DynamicDialogModule,
    SharedModule,
    MultiSelectModule,
    CalendarModule,
    AccordionModule
  ],

  providers: [
    DialogService,
  ],
  entryComponents: [
    AddQuestionModalComponent
  ]

})
export class AdminModule { }
