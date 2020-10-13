import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";



@Component({
    templateUrl: './app.newTask.html'
})
export class NewTaskComponent {
    name: String;
    description: String;
    deadline: Date;
    deadline_datetime: Date;
    _http: HttpClient;
    _errorMessage: String = "";
    _validation: String;
    username: String;
 


    constructor(private http: HttpClient, private router: Router) {
        this._http = http;
        this.updateLinks()
    }

    updateLinks() {         
        if(sessionStorage.getItem('username')) {
            this.username = sessionStorage.getItem('username')
        }
    }

    createTask() {
        let now = new Date();
        this.deadline_datetime = new Date(this.deadline);
        if(this.deadline_datetime.getTime() < now.getTime()) {
            this._errorMessage = "Invalided deadline input."
        } 
        else if(this.name == "") {
            this._errorMessage = 'Task name can not be empty.'
        }
        else if(this.description == "") {
            this._errorMessage = 'Task description can not be empty.'
        }
        else if(!this.deadline) {
            this._errorMessage = 'Task deadline can not be empty.'
        }
        else {
            // let url = "http://localhost:1337/newTask";
            let url = 'https://tdl-nodjs.herokuapp.com/newTask';


            // console.log(this.username)
            let newTask = {
                "name": this.name,
                "description": this.description,
                "deadline": this.deadline,
                "username": this.username
            }
            this._http.post<any>(url, newTask)
            .subscribe(
                (data) => {
                    // console.log(data)
                    alert('New task successfully created.')
                    this.router.navigateByUrl('/main');
                },
                error => {
                    alert(JSON.stringify(error));
                });
        }

    }

}

