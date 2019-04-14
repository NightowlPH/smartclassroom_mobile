import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationStart }    from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { LoadingController, NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { interval, from } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { PopoverLogoutPage } from '../popover-logout/popover-logout.page';

@Component({
  selector: 'app-rooms-status',
  templateUrl: './rooms-status.page.html',
  styleUrls: ['./rooms-status.page.scss'],
})
export class RoomsStatusPage implements OnInit, OnDestroy {

  private baseUrl = environment.backend_uri;
  private runTimer: boolean;
  private checkNav: boolean = true;

	rooms_status: object[]
	room_filter:any = { room_name: '' };

  constructor(private http: HTTP, private storage:Storage, private router:Router,public popoverController: PopoverController,
  		        public loadingController: LoadingController, private navController:NavController) { }

  getStatus(){
		this.storage.get('auth-token').then( token =>
		{
			if(token)
      {
        let url = `${this.baseUrl}/roomsStatus`;
        from(this.http.get(url, {}, {'x-access-token': token}))
          .pipe(map(data => JSON.parse(data.data)))
          .subscribe( data => {
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

  private startTimer(){
    this.runTimer = true;
    interval(4000)
      .pipe(takeWhile(() => this.runTimer))
      .subscribe(x => {this.getStatus();});
  }

	ngOnInit()
  {
    this.getStatus();
    this.router.events.pipe(takeWhile(() => this.checkNav)).subscribe((event) => {
      if (event instanceof NavigationStart){
        if(event.url == "/rooms-status"){
          console.log("We're back");
          this.startTimer();
        }
        else{
          console.log("Bye");
          this.runTimer = false;
        }
      }
    })
    this.startTimer();
  }

  ngOnDestroy(){
    console.log("Moving away");
    this.runTimer = false;
    this.checkNav = false;
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
	}

}
