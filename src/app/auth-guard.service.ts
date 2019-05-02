import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {	

    constructor(private router: Router, private storage:Storage) { }

  canActivate(): boolean { 

  	return true
  }
}
