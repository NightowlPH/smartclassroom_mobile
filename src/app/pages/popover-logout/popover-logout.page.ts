import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-logout',
  templateUrl: './popover-logout.page.html',
  styleUrls: ['./popover-logout.page.scss'],
})
export class PopoverLogoutPage implements OnInit {

	private baseUrl = environment.backend_uri;
	private token: string

  constructor(private http: HttpClient, private storage:Storage, private router:Router, private popoverController: PopoverController) { }

  ngOnInit() {
  }

  logout()
  {
  	this.storage.get('auth-token').then( token =>
	{
		if(token)
		{
			this.token = token
			this.storage.remove('auth-token')
			this.http.post(`${this.baseUrl}/logout`,{},
	        {
	        	headers: new HttpHeaders().set('x-access-token',this.token)
	        }).subscribe( data => {
	        	this.handleError(data)
	        	this.router.navigate(['/login'])
	        	this.popoverController.dismiss();     	
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

  	private handleError(response)
	{
		if(response == 401)
    	{
    		this.storage.remove('auth-token')
        	this.router.navigate(['/login'])
    	}
	}

}
