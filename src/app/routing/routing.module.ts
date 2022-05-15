import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { RoutingRoutingModule } from './routing-routing.module';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskListComponent } from '../task-list/task-list.component';


//define routes for each component
const routes: Routes = [
  { path:'', component: TaskListComponent },
  { path:'createtask', component: TaskCreateComponent },
  { path:'edittask/:taskId', component: TaskCreateComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoutingRoutingModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
