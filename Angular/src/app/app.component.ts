import { Component } from '@angular/core';
import { ApiService } from './ApiService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";



@Component({
    selector: 'app-root',
    templateUrl: `app.component.html`


})
export class AppComponent {
    role: string = "";
    username: string = "";
    auth_token: string = "";
    _apiService: ApiService;
    public site = 'https://tdl-nodjs.herokuapp.com/';


    constructor(private http: HttpClient, private router: Router) {
        this._apiService = new ApiService(http, this);
        this.updateLinks();
        if(this.auth_token=="") {
            this.router.navigateByUrl('/login');
        }
        else{
            this.router.navigateByUrl('/main');
        }

    }

    updateLinks() {

        if (sessionStorage.getItem('username')) {
            this.username = sessionStorage.getItem('username')
        }
        if (sessionStorage.getItem('auth_token')) {
            this.auth_token = sessionStorage.getItem('auth_token')
        }
    }

    logout() {
        sessionStorage.clear();
        window.location.reload();
    }
}  