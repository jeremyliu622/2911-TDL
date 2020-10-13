import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { routing }        from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './app.main';
import { DoneTasksComponent } from './app.doneTasks';
import { NewTaskComponent } from './app.newTask';
import { RegisterComponent } from './app.register';
import { LoginComponent } from './app.login';

@NgModule({
  declarations: [
    AppComponent, MainComponent, DoneTasksComponent, NewTaskComponent,
    RegisterComponent, LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
