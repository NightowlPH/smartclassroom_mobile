import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.backend_uri;

  constructor(private http: HTTP,) { }

  login(data: Object) {		
    let url = `${this.baseUrl}/login`;
    this.http.setDataSerializer('json');
    return this.http.post(url, data, {}).then((data) => {return JSON.parse(data.data)});
	}
}
