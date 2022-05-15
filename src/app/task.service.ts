import { Injectable } from '@angular/core';
import {Task} from './app.task.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks!: Task[];
  private tasksUpdated = new Subject<Task[]>();

  getTasks(){
    //return [...this.posts];
    this.http.get<{message:string, tasks:any}>('http://localhost:3000/api/tasks')
    .pipe(map((taskData)=>{
      return taskData.tasks.map((task:any) =>{
        return {
          task_name: task.task_name,
          task_desc:task.task_desc,
          assignee:task.assignee,
          s_date: task.s_date,
          d_date:task.d_date,
          id: task._id
        }
      })
    }))
    .subscribe((transformedData)=>{
      console.log(transformedData);
      this.tasks = transformedData;
      this.tasksUpdated.next([...this.tasks]);
    })
  }

  addTaskService(task_name: string, task_desc: string,assignee: string, s_date:Date,d_date:Date){
  const task: Task ={id:null!, task_name: task_name, task_desc:task_desc,assignee:assignee,s_date:s_date,d_date:d_date};
  console.log("*****************************",task);
  this.http.post<{message: string; taskId: string}>('http://localhost:3000/api/tasks',task)
  .subscribe((responseData)=>{
    const id = responseData.taskId;
    task.id = id;
    console.log("*****Server Responded", responseData);
    this.tasks.push(task);
    this.tasksUpdated.next([...this.tasks]);
  });
  }

  deleteTask(taskId: string | undefined){
    this.http.delete('http://localhost:3000/api/tasks/'+taskId)
    .subscribe(()=>{
      const updatedTask = this.tasks.filter(task=> task.id !=taskId);
      this.tasks = updatedTask;
      this.tasksUpdated.next([...this.tasks]);
      console.log('Deleted!');
    })
  }

updateTask(id:string, task_name: string, task_desc: string,assignee: string, s_date:Date,d_date:Date){
  const task: Task = {id: id, task_name: task_name, task_desc:task_desc,assignee:assignee,s_date:s_date,d_date:d_date};
  this.http.put('http://localhost:3000/api/tasks/'+id, task)
  .subscribe(response => console.log(response));
}

getTask(id: string | undefined){
  //this.posts.find(post => post.id ===id);
  return this.tasks.find(task => task.id ===id);
}
 getTaskUpdateListner()
 {
   return this.tasksUpdated.asObservable();
 }
  constructor(private http:HttpClient) { }
}
