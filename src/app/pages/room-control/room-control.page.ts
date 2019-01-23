import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';

import { PopoverLogoutPage } from '../popover-logout/popover-logout.page';

@Component({
  selector: 'app-room-control',
  templateUrl: './room-control.page.html',
  styleUrls: ['./room-control.page.scss'],
})
export class RoomControlPage implements OnInit {

	private baseUrl = environment.backend_uri;
	private token: string

	room_status: object = {"date":""}
	aircon_temperature: number

	constructor(private http: HttpClient, private storage:Storage, private route: ActivatedRoute, private router:Router, private popoverController:PopoverController ) { }

	ngOnInit() {
		console.log(this.route.snapshot.params['room_id'])
		this.storage.get('auth-token').then( token =>
		{
			if(token)
			{
				this.token = token
				this.http.get(`${this.baseUrl}/roomDevices/${this.route.snapshot.params['room_id']}`,
		        {
		        	headers: new HttpHeaders().set('x-access-token',token)
		        }).subscribe( data => {
		        	console.log(data)
		        	this.handleError(data)
		        	this.room_status = data
		        	this.aircon_temperature = data['devices'][0]['device_status']
		        },(error) => {   		
			        this.handleError(error['status'])       
			     })
			}
			else
			{
				this.router.navigate(['/login'])
			}
		})
	}

	changeTemperature(room_status_id: string)
	{		
		console.log(this.aircon_temperature)
		this.http.put(`${this.baseUrl}/roomStatusByID/${room_status_id}`, {"value": this.aircon_temperature},
        {
        	headers: new HttpHeaders().set('x-access-token',this.token)
        }).subscribe( data => {
        	console.log(data)
        	this.handleError(data)
        	this.ngOnInit()
        },(error) => {   		
	        this.handleError(error['status'])       
	     })
	}

	controlLights(data: any, room_status_id: string)
	{
		// console.log(data)
		console.log("Lights",data['detail']['checked'])
		this.http.put(`${this.baseUrl}/roomStatusByID/${room_status_id}`, {"value": data['detail']['checked']},
        {
        	headers: new HttpHeaders().set('x-access-token',this.token)
        }).subscribe( data => {
        	console.log(data)
        	this.handleError(data)
        	this.ngOnInit()
        },(error) => {   		
	        this.handleError(error['status'])       
	     })
	}

	controlAircon(data: any, room_status_id: string)
	{
		console.log("Aircon",data['detail']['checked'])
		this.http.put(`${this.baseUrl}/roomStatusByID/${room_status_id}`, {"value": data['detail']['checked']},
        {
        	headers: new HttpHeaders().set('x-access-token',this.token)
        }).subscribe( data => {
        	console.log(data)
        	this.handleError(data)
        	this.ngOnInit()
        },(error) => {   		
	        this.handleError(error['status'])       
	     })
	}

	controlDoor(data: any, room_status_id: string)
	{
		console.log("Door",data['detail']['checked'])
		this.http.put(`${this.baseUrl}/roomStatusByID/${room_status_id}`, {"value": data['detail']['checked']},
        {
        	headers: new HttpHeaders().set('x-access-token',this.token)
        }).subscribe( data => {
        	console.log(data)
        	this.handleError(data)
        	this.ngOnInit()
        },(error) => {   		
	        this.handleError(error['status'])       
	     })
	}

	navigateback()
	{
		this.router.navigate(['/rooms-status'])
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

	private handleError(response)
	{
		if(response == 401)
    	{
    		this.storage.remove('auth-token')
        	this.router.navigate(['/login'])
    	}
	}

}
