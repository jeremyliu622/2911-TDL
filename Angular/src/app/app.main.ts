import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './app.main.html'
})
export class MainComponent {
    username: String;
    _allTasksArray: Array<any>;
    _sortedTasksArray: Array<any>;
    _overdueTasksArray: Array<any> = [];
    _todayTasksArray: Array<any> = [];
    _weekTasksArray: Array<any> = [];
    _otherTasksArray: Array<any> = [];
    _http: HttpClient;
    _today;
    _todayTime;
    selectedTask
    taskDate;
 


    constructor(private http: HttpClient) {
        this._http = http;
        this.updateLinks()
        this.getTasks();
        this._today = new Date();
        this._todayTime = this.getTime(this._today)
        this._today = this.formatTaskDeadline(this._today);

    }

    updateLinks() {         
        if(sessionStorage.getItem('username')) {
            this.username = sessionStorage.getItem('username')
        }
    }

    formatTaskDeadline(_date) {
        let month = '' + (_date.getMonth() + 1);
        let day = '' + _date.getDate();
        let year = _date.getFullYear();

    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return year+month+day
    }

    getTime(_date) {
        let hour = _date.getHours();
        let min = _date.getMinutes();
        let _mins = hour*60 + min;
        return _mins
    }

    getTasks() {
        // let url = 'http://localhost:1337/toDoTasks';
        let url = 'https://tdl-nodjs.herokuapp.com/toDoTasks';

        this._http.post<any>(url, {username:this.username})
        .subscribe(result => {
            this._allTasksArray = result.toDoTasks;

            
            // order all tasks by time
            for(let i=0; i<this._allTasksArray.length; i++){
                this._allTasksArray[i].deadline = new Date(this._allTasksArray[i].deadline.slice(0,-1))
            }
            this._sortedTasksArray = this._allTasksArray.sort((a, b)=>  a.deadline -  b.deadline)

            // divide tasks into diiferent time periods
            for(let i=0; i<this._sortedTasksArray.length; i++) {
                this.taskDate = this.formatTaskDeadline(this._sortedTasksArray[i].deadline);
                if(this.taskDate == this._today) {
                    if(this.getTime(this._sortedTasksArray[i].deadline) - this._todayTime < 0) {
                        this._overdueTasksArray.push(this._sortedTasksArray[i])
                    }
                    else {
                        this._todayTasksArray.push(this._sortedTasksArray[i])
                    }
                }
                else if(this.taskDate - this._today <= 7 && this.taskDate - this._today > 0) {
                    this._weekTasksArray.push(this._sortedTasksArray[i])

                }
                else if(this.taskDate - this._today > 7) {
                    this._otherTasksArray.push(this._sortedTasksArray[i])
                }
            }
        })
    }

    
    onSelect(task) {
        this.selectedTask = task;
    }

    deleteTask() {
        // let url = "http://localhost:1337/deleteTask";
        let url = 'https://tdl-nodjs.herokuapp.com/deleteTask';

        this.http.post(url,{task:this.selectedTask,
                            username:this.username})
            .subscribe(
                (data) => {
                    // console.log(data)
                },
                error => {
                    alert(JSON.stringify(error));
                });
        location.reload();

    }

    completeTask() {
        // let url = "http://localhost:1337/completeTask";
        let url = 'https://tdl-nodjs.herokuapp.com/completeTask'

        this.http.post(url,{task:this.selectedTask,
                            username:this.username})
        .subscribe(
            (data) => {
                // console.log(data)
            },
            error => {
                alert(JSON.stringify(error));
            });
        location.reload();
    }

    markTask() {
        // let url = "http://localhost:1337/markTask";
        let url = "https://tdl-nodjs.herokuapp.com/markTask";

        if(this.selectedTask.color == "red") {
            this.selectedTask.color = "regular";
        }
        else if(this.selectedTask.color == "regular") {
            this.selectedTask.color = "red"
        }

        this.http.post(url,{task:this.selectedTask,
                            username:this.username})
        .subscribe(
            (data) => {
                console.log(data)
            },
            error => {
                alert(JSON.stringify(error));
            });

    }

}