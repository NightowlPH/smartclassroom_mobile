import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginService } from 'src/app/services/login.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [HTTP, LoginService]
})
export class LoginPageModule {}
