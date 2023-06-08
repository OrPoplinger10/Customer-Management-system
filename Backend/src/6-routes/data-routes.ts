import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import TaskModel from "../2-models/task-model";

const router = express.Router();

router.get("/customers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const customers = await dataService.getAllCustomers();
        response.json(customers)
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/tasks-and-customers", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const tasksAndCustomer = await dataService.getAllTasksAndCustomers();
        response.json(tasksAndCustomer)

    }
    catch(err: any) {
        next(err);
    }
});

router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const task = new TaskModel(request.body);
        const addedTask = await dataService.addTask(task);
        response.status(201).json(addedTask)

    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/tasks/:taskId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const taskId = +request.params.taskId;
        await dataService.deleteTask(taskId);
        response.sendStatus(204);
        
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
