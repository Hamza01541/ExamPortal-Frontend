import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { UserRoutingModule } from './user-routing.module';
import { DownalodComponent } from './downalod/downalod.component';
import { QuestionnairComponent } from './questionnair/questionnair.component';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../shared/shared.module';
import { UserTabComponent } from './user-tab/user-tab.component'
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';


// import { AppnavigationComponent } from 'src/app/appnavigation/appnavigation.component';
@NgModule({
  declarations: [
    DownalodComponent,
    QuestionnairComponent,
    UserTabComponent,
    AddUserFormComponent
    // AppnavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserRoutingModule,
    FormsModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    SharedModule,
    TableModule,
    CalendarModule,
  ]
})
export class UserModule { }
