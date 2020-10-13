import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './app.doneTasks.html'
})
export class DoneTasksComponent {
    _doneTasksArray: Array<any>;
    _sortedTasksArray: Array<any>;
    username: String;
    _http: HttpClient;
    selectedTask;

 


    constructor(private http: HttpClient) {
        this._http = http;
        this.updateLinks()
        this.getDoneTasks();
    }

    updateLinks() {         
        if(sessionStorage.getItem('username')) {
            this.username = sessionStorage.getItem('username')
        }
    }

    getDoneTasks() {
        // let url = "http://localhost:1337/doneTasks";
        let url = "https://tdl-nodjs.herokuapp.com/doneTasks";

        this._http.post<any>(url, {username:this.username})
        .subscribe(result => {
            this._doneTasksArray = result.doneTasks;
            // order all tasks by time
            for(let i=0; i<this._doneTasksArray.length; i++){
                this._doneTasksArray[i].deadline = new Date(this._doneTasksArray[i].deadline.slice(0,-1))
            }
            this._sortedTasksArray = this._doneTasksArray.sort((a, b)=>  a.complete -  b.complete)
        })


    }

    onSelect(task) {
        this.selectedTask = task;
    }

}