import { Component, OnInit } from '@angular/core';
import {Task} from '../app.task.model';
import { TaskService } from 'src/app/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  Tasks: Task[] = [];
  private tasksSub: Subscription | undefined;

  panelOpenState = false;
  constructor(public taskService: TaskService) { }


  ngOnInit(): void {
    this.taskService.getTasks();
    console.log(this.Tasks);
    this.tasksSub = this.taskService.getTaskUpdateListner().subscribe((Tasks: Task[]) => {
        this.Tasks = Tasks;
        console.log("list :",this.Tasks);
      });
  }

  ngOnDestroy(): void {
    this.tasksSub?.unsubscribe();
  }

onDelete(taskId:string | undefined){
  this.taskService.deleteTask(taskId);
}
}
