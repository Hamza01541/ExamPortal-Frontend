import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from "primeng/card";
import { UserModule } from './modules/user/user.module';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../app/shared/shared.module';
import { AdminService, RequestService } from './shared/services';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    LoginComponent,
  ],
  imports: [
    // CommonModule,
    // BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    UserModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    SharedModule,
    CardModule,
    CoreModule,
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
