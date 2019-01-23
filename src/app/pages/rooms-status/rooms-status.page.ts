import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router }    from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { PopoverLogoutPage } from '../popover-logout/popover-logout.page';

@Component({
  selector: 'app-rooms-status',
  templateUrl: './rooms-status.page.html',
  styleUrls: ['./rooms-status.page.scss'],
})
export class RoomsStatusPage implements OnInit {

	private baseUrl = environment.backend_uri;

	rooms_status: object[]
	room_filter:any = { room_name: '' };

  	constructor(private http: HttpClient, private storage:Storage, private router:Router,public popoverController: PopoverController,
  		        public loadingController: LoadingController, private navController:NavController) { }

	ngOnInit() 
	{
		this.storage.get('auth-token').then( token =>
		{
			if(token)
			{
				this.http.get(`${this.baseUrl}/roomsStatus`,
		        {
		        	headers: new HttpHeaders().set('x-access-token',token)
		        }).subscribe( data => {
		        	console.log(data)
		        	if(data == 401)
		        	{
		        		this.storage.remove('auth-token')
			        	this.router.navigate(['/login'])
		        	}
		        	this.rooms_status = data['room_status']

		        },(error) => {   		
			        if(error['status'] == 401)
			        {
			        	this.storage.remove('auth-token')
			        	this.router.navigate(['/login'])       	
			        }        
			     })
			}
			else
			{
				this.router.navigate(['/login'])
			}
		})
	}

	async moreOptions(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverLogoutPage,
      event: ev,
      componentProps: {
        custom_id: 1
      }
    });
    await popover.present();
  }

	room_control(room_id)
	{		
		this.router.navigate(['room-control',room_id])
		// this.navController.n		
	}

}
