import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './app.main';
import { DoneTasksComponent } from './app.doneTasks';
import { NewTaskComponent } from './app.newTask';
import { RegisterComponent } from './app.register';
import { LoginComponent } from './app.login';


const appRoutes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'done', component: DoneTasksComponent},
  {path: 'new', component: NewTaskComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
