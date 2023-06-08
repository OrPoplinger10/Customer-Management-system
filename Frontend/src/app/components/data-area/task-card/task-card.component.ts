import { Component, EventEmitter, Input, Output } from '@angular/core';
import TaskModel from 'src/app/models/task-model';
import * as moment from 'moment';

@Component({

  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']

})

export class TaskCardComponent {

   @Input()
    public task: TaskModel;

   @Output()
    public deleteMe = new EventEmitter<number>(); 

   public async deleteTask() {
    this.deleteMe.emit(this.task.taskId)

}

formattedDate: string;

ngOnInit() {
  const date = moment(this.task.date); 
  this.formattedDate = date.format('MMMM Do YYYY'); // Customize the format as per your requirements
}

}

 
