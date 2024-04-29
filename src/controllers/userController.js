import { UsersRepository } from '../repositories/userRepository.js'

export class UsersController {
    static instance
    constructor() {
        this.repository = new UsersRepository();
    }

    getAllTasks = async (req, res) => {
        const allTask = await this.repository.getTasks();
        return res.json(allTask);
    }

    createTask = async (req, res) => {
        const task = req.body;
        console.log(task);

        const cratedTask = await this.repository.createTask(task);

        return res.json(cratedTask);
    }

    updateTask = async (req, res) => {
        const id = Number(req.params.id);
        const task = req.body;

        const taskUpdated = await this.repository.updateTask(id, { ...task });

        return res.json(taskUpdated);
    }

    deleteTask = async (req, res) => {
        const id = Number(req.params.id);
        console.log(id);
    
        await this.repository.deleteTask(id);

        return res.json({ ok: true });
    }
}