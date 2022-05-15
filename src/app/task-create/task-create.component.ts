import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from './../task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from '../app.task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  task_name="";
  task_desc="";
  assignee="";
  s_date="";
  d_date="";

  private status='todo';
  private taskId!:string;
  task!:Task;

  constructor(public taskService: TaskService, public route:ActivatedRoute) { }



  submitTask(form: NgForm){
    // addTask function directly written in the submit form
    // when the form will be submitted it will automatically add the details

    if(this.status=='todo'){
      this.taskService.addTaskService(
        form.value.task_name,
        form.value.task_desc,
        form.value.assignee,
        form.value.s_date,
        form.value.d_date);
    }
else{
  this.taskService.updateTask(
    this.taskId,
    form.value.task_name,
    form.value.task_desc,
    form.value.assignee,
    form.value.s_date,
    form.value.d_date);
}


    form.reset();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      console.log("parammap is", paramMap);
      if(paramMap.has('taskId')){
        this.status = 'edit';
        this.taskId = paramMap.get('taskId')!;
        console.log("Task ID", this.taskId);
        this.task = this.taskService.getTask(this.taskId)!;

        console.log("Got the task", this.task);
      }
      else {
        this.status ='create';
        this.taskId = null!;
        console.log("not in edit");
      }
    })
  }
}
