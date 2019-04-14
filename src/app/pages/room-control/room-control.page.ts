import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { Observable, from, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { PopoverLogoutPage } from '../popover-logout/popover-logout.page';

export interface Device {
  room_status_id?: number;
  device_status?: string;
  device_name?: string;
}

export interface RoomStatus {
  date?: string;
  room_name?: string;
  devices?: Device[];
}


@Component({
  selector: 'app-room-control',
  templateUrl: './room-control.page.html',
  styleUrls: ['./room-control.page.scss'],
})
export class RoomControlPage implements OnInit, OnDestroy {

	private baseUrl = environment.backend_uri;
  private token: string
  private runTimer: boolean;

	room_status: RoomStatus = {"date":""}
	aircon_temperature: number

  constructor(private http: HTTP, private storage:Storage, private route: ActivatedRoute, private router:Router, private popoverController:PopoverController ) {
    this.http.setDataSerializer('json');
  }

  getStatus(){
		this.storage.get('auth-token').then( token =>
		{
			if(token)
			{
        this.token = token;
        let url = `${this.baseUrl}/roomDevices/${this.route.snapshot.params['room_id']}`;
        console.log("Fetching data from", url);
        from(this.http.get(url, {}, {'x-access-token': token}))
          .pipe(map(data => JSON.parse(data.data)))
          .subscribe( data => {
            console.log("Device data:",data)
            this.room_status = data
            this.aircon_temperature = data['devices'][0]['device_status']
          },(error) => {   		
            this.handleError(error['status'])
         });
			}
			else
			{
				this.router.navigate(['/login'])
			}
		});
  }

  ngOnDestroy(){
    console.log("Moving away");
    this.runTimer = false;
  }

  ngOnInit() {
    this.runTimer = true;
    console.log("Getting status for room", this.route.snapshot.params['room_id']);
    this.getStatus();
    interval(4000)
      .pipe(takeWhile(() => this.runTimer))
      .subscribe( x =>{ this.getStatus(); });
  }

  setDeviceValue(room_status_id: string, value: any){
    let url = `${this.baseUrl}/roomStatusByID/${room_status_id}`;
    console.log("Putting data data to", url);
    if(!isNaN(parseInt(value))){
      value=parseInt(value);
    }
    console.log("Data", value);
    from(this.http.put(url, {"value": value}, {'x-access-token': this.token}))
      .pipe(map(data => JSON.parse(data.data)))
      .subscribe( data => {
        console.log("Device data:",data)
        this.getStatus();
      }, (error) => {   		
        this.handleError(error['status'])
     })

  }

	changeTemperature(room_status_id: string)
	{		
    console.log(this.aircon_temperature)
    this.setDeviceValue(room_status_id, this.aircon_temperature);
	}

	controlLights(data: any, room_status_id: string)
	{
		console.log("Lights",data['detail']['checked'])
    this.setDeviceValue(room_status_id, data['detail']['checked']);
	}

	controlAircon(data: any, room_status_id: string)
	{
		console.log("Aircon",data['detail']['checked'])
    this.setDeviceValue(room_status_id, data['detail']['checked']);
	}

	controlDoor(data: any, room_status_id: string)
	{
		console.log("Door",data['detail']['checked'])
    this.setDeviceValue(room_status_id, data['detail']['checked']);
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
    console.error(response);
		if(response == 401)
    	{
    		this.storage.remove('auth-token')
        this.router.navigate(['/login'])
    	}
	}

}
