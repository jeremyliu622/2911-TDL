import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from "@angular/router";


@Component({
    templateUrl: './app.login.html'
})

export class LoginComponent { 
    // Hard-code credentials for convenience.
    username              = '';
    password              = '';         
    token                 = '';
    message               = 'Not logged in.';
    reqInfo:any           = {};
    _apiService:ApiService;

    constructor(private http: HttpClient, private router: Router) {
        this._apiService = new ApiService(http, this);
        this.showContentIfLoggedIn();
    }
  

    showContentIfLoggedIn() {
        if(sessionStorage.getItem('auth_token')!=null) {
            this.token   = sessionStorage.getItem('auth_token');
            this.message = "The user has been logged in."
        }
        else {
            this.message = "Not logged in.";
            this.token   = ''
        }
    }

    login() {
        let url = 'https://tdl-nodjs.herokuapp.com/auth';
        // let url = 'http://localhost:1337/auth';
    
        this.http.post(url, {
                username:  this.username,
                password:  this.password,
            })
        .subscribe( 
        (data) => {
            if(data["token"]  != null)  {
                this.token = data["token"]
                sessionStorage.setItem('auth_token', data["token"]);
                sessionStorage.setItem('username', data['user']['username'])
                this.router.navigateByUrl('/main');
            }    
        },
        error => {
            alert("Please check you username or password.");             
        });
    }

}