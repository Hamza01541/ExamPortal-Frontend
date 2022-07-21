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
import { SharedModule } from '../../shared/shared.module'
// import { AppnavigationComponent } from 'src/app/appnavigation/appnavigation.component';
@NgModule({
  declarations: [
    DownalodComponent,
    QuestionnairComponent,
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
    SharedModule
  ]
})
export class UserModule { }
