import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './ApiService';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ElementFinder } from 'protractor';




@Component({
    templateUrl:`app.register.html`
 
})

export class RegisterComponent {
    role:string = "";
    firstName:string = "";
    lastName:string = "";
    email:string = "";
    username:string = "";
    password:string = "";
    passwordConfirm:string = "";
    errorMessage: string = "";

    reqInfo:any = {};
    _apiService:ApiService;

    constructor(private http: HttpClient, private router: Router) {
        this._apiService = new ApiService(http, this);
    }



    register() {
        // let url = 'http://localhost:1337/CreateUser';
        let url = 'https://tdl-nodjs.herokuapp.com/CreateUser'


        let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email);
        let validPasswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/.test(this.password);

        if(!this.username) {
            this.errorMessage = "Please enter a username."

        }
        else if(!this.firstName) {
            this.errorMessage = "Please enter your first name."
        }
        else if(!this.lastName) {
            this.errorMessage = "Please enter your last name."
        }
        else if(!validEmail) {
            this.errorMessage = "Email format is incorrect."
        }
        else if(!validPasswd) {
            this.errorMessage = "Password must be 6 to 20 characters " + 
            "which contain at least one numeric digit, one uppercase and one lowercase letter."
        }
        else {

            this.http.post(url, {
                firstName:    this.firstName,
                lastName:     this.lastName,
                email:        this.email,
                username:     this.username,
                password:      this.password,
                passwordConfirm: this.passwordConfirm
            })
            .subscribe(
                (data) => {
                    this.errorMessage = data['errorMessage']['message']
                    if(this.errorMessage){
                        console.log(this.errorMessage)
                    }
                    else{
                        alert("User registration is successful, please log in.")
                        this.router.navigateByUrl('/login');
    
                    }    
                },
                error => {
                    alert(JSON.stringify(error));             
                });

        }
        
    }
}