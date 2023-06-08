import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CustomerModel from 'src/app/models/customer-model';
import TaskModel from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-insert',
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

    public customers: CustomerModel[];
    public task = new TaskModel();
    

    public constructor(private dataService: DataService, 
        private notifyService: NotifyService,
        private router: Router) { }
    

    public async ngOnInit() {

        try {
            this.customers = await this.dataService.getAllCustomers();

        }
        catch(err: any){
            this.notifyService.error(err);
        }
        
    }

    public async send() {

        const currentDate = new Date();
    const selectedDate = new Date(this.task.date);

    if (selectedDate < currentDate) {
      this.notifyService.error("Past dates are not allowed.");
      return;
    }

        try {
            await this.dataService.addTask(this.task);
            this.notifyService.success("Task added");
            this.router.navigateByUrl("/list");
            
            
        }
        catch(err: any){
            this.notifyService.error(err);
        }

    }

}
