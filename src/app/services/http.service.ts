import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public apiBaseUrlDev = ':3000/api/auth';
  public apiBaseUrlProd = '/api/auth';
  public apiBaseUrl = '';
  public header = new HttpHeaders();
  constructor(public httpClient: HttpClient) {
      this.header.set('Access-Control-Allow-Origin', '*');
      this.apiBaseUrl = environment.production ? this.apiBaseUrlProd : this.apiBaseUrlDev;
      this.apiBaseUrl = `http://${window.location.hostname}${this.apiBaseUrl}`;
  }

  sendPostRequest(data: any): Observable<object> {
    // generally an SSL or https connection would be used
    return this.httpClient.post<any>(this.apiBaseUrl, data);
  }

}
