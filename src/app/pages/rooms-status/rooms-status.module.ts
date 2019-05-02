import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { RoomsStatusPage } from './rooms-status.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsStatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPipeModule,
    RouterModule.forChild(routes),    
  ],
  declarations: [RoomsStatusPage],
  providers: [HTTP]
})
export class RoomsStatusPageModule {}
