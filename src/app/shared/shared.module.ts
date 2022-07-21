import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { AppnavigationComponent } from './components';
import { BrowserModule } from '@angular/platform-browser';
import { AdminService, RequestService } from './services';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppnavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MenubarModule,
    HttpClientModule,
  ],
   exports: [
    CommonModule,
    BrowserModule,
    MenubarModule,
    AppnavigationComponent
   ],
   providers: [RequestService, AdminService]
})
export class SharedModule { }
