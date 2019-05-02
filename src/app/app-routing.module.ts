import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { 
  	path: 'rooms-status',
  	canActivate: [AuthGuardService], 
  	loadChildren: './pages/rooms-status/rooms-status.module#RoomsStatusPageModule' 
  },   
  { 
  	path: 'room-control/:room_id', 
  	loadChildren: './pages/room-control/room-control.module#RoomControlPageModule'
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
