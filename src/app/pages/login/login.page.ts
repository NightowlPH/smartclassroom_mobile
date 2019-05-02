import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { LoginService  } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modalForm: FormGroup
  message: string;

  constructor( private storage:Storage, private loginService:LoginService, private formBuilder: FormBuilder, private router: Router)
  	{
   		this.createForm() 	   	
	}

  createForm()
	{		
		this.modalForm = this.formBuilder.group
		({		
		    username: ['', Validators.required],
		    password: ['', Validators.required]
		})
	}

  ngOnInit() {  	  	
  	this.storage.get('auth-token').then( res =>
  	{
  		console.log(res)
  		if(res)
  		{
  			this.router.navigate(['/rooms-status']);
  		}
  	})
  }

  login()
  {  	
  	this.loginService.login(this.modalForm.value)
      .then( data =>
      {  		
        console.log(data)
        if(data['userType'] == "Admin"|| data['userType'] == "User")
        {  			
          console.log("pass")
          this.message=""
          this.storage.set('auth-token',data['token'])  			
          this.router.navigate(['/rooms-status']);  			
        }
        else{
          this.message = "Invalid username or password"
        }
      })
      .catch(error => {
        console.log("An error occured: ", error)
        if(error['status'] == 401)
        {
        	this.storage.remove('auth-token')
        	this.message = "Invalid username or password"
        }
     });
  }

}
