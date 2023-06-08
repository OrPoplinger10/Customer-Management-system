import { Component, OnInit } from '@angular/core';
import TaskModel from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  
})
export class ListComponent implements OnInit {

    public tasks: TaskModel[];

    public constructor(private dataService: DataService, private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            this.tasks = await this.dataService.getAllTasksAndCustomers();
        }
        catch(err: any) {
            this.notifyService.error(err);
        }
    }

    public async deleteThisTask(taskId: number) {

        try {
            await this.dataService.deleteTask(taskId);
            this.notifyService.success("Task deleted");
            const index = this.tasks.findIndex(t => t.taskId === taskId)
            this.tasks.splice(index, 1);

        }
        catch(err: any) {
            this.notifyService.error(err);
        }
    
}

}
