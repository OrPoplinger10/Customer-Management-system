import CustomerModel from "../2-models/customer-model";
import TaskModel from "../2-models/task-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";

async function getAllCustomers(): Promise<CustomerModel[]> {

     const sql = `SELECT * FROM customers`;
     const customers = await dal.execute(sql);
     return customers;
}

async function getAllTasksAndCustomers(): Promise<TaskModel[]> {

     const sql = `SELECT tasks.*,CONCAT(customers.name) AS customerName
                 FROM tasks join customers
                 ON tasks.customerId = customers.customerId`;
     const tasksAndCustomer = await dal.execute(sql);
     return tasksAndCustomer;
}

async function addTask(task: TaskModel): Promise<TaskModel> {

     const sql = "INSERT INTO tasks VALUES(DEFAULT, ?, ?, ?)";
     const result: OkPacket = await dal.execute(sql, [task.taskDescription, task.date, task.customerId]);
     task.taskId = result.insertId;
     return task;

}


async function deleteTask(taskId: number): Promise<void> {

     const sql = ` DELETE FROM tasks WHERE taskId =?`;
     await dal.execute(sql, [taskId]);
    
}


export default {
    getAllCustomers,
    getAllTasksAndCustomers,
    addTask,
    deleteTask
};

