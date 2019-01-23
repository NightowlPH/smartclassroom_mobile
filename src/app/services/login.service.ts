import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private baseUrl = environment.backend_uri;

    constructor(private http: HttpClient,) { }


    login(data: Object)
	{		
        return this.http.post(`${this.baseUrl}/login`, data)        
	}
}
