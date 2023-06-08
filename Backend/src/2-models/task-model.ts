class TaskModel {

    public taskId: number;
    public taskDescription: string;
    public date: string;
    public customerId: number;
    

    public constructor(task: TaskModel) {

        this.taskId = task.taskId;
        this.taskDescription = task.taskDescription;
        this.date = task.date;
        this.customerId = task.customerId;
        
        
  }

}

export default TaskModel