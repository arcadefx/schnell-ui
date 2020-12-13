import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'schnell-ui';

  public Username = '';
  public Password = '';
  public Status = '';
  public Message = '';

  constructor(public httpService: HttpService, public cookieService: CookieService) {
    this.httpService = httpService;
    this.cookieService = cookieService;
  }

  ngOnInit(): void {
    // todo: put in check for cookie so see if already logged in
  }

  gotoWebsite(): void {
    const urlHack = 'http://onecause.com';
    window.open(urlHack, '_top');
  }

  getToken(): string {
    let token = '';
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const newMin = min < 10 ? `0${min}` : `${min}`;
    const newHour = hour < 10 ? `0${hour}` : `${hour}`;
    token = `${newHour}${newMin}`;
    return token
  }

  resetForm() {
    this.Username = '';
    this.Password = '';
    this.Status = '';
    this.Message = '';
  }

  authenticateUser(): void {
    const data = {
      Email: this.Username,
      Password: this.Password,
      Token: this.getToken()
    };
    this.httpService.sendPostRequest(data).subscribe((responseBody: any) => {
      this.Status = _.get(responseBody, 'Status');
      this.Message = _.get(responseBody, 'Message');
      if (this.Status === 'success') {
        this.cookieService.set('_uid', _.get(responseBody, 'SessionCookie'));
        this.resetForm();
        this.gotoWebsite();
        return;
      }
    });
  }

}
