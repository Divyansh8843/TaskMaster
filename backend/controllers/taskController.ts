import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { page = 1, limit = 10, status, priority, search } = req.query;

        const query: any = { user: userId };

        if (status && status !== 'all') {
            query.status = status;
        }

        if (priority && priority !== 'all') {
            query.priority = priority;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const tasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Task.countDocuments(query);

        res.json({
            tasks,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { title, description, status, priority, dueDate } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = await Task.create({
            user: userId,
            title,
            description,
            status,
            priority,
            dueDate
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;
        
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = (req as any).user.id;

        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: id });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

export const getTaskStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        
        const total = await Task.countDocuments({ user: userId });
        const pending = await Task.countDocuments({ user: userId, status: 'pending' });
        const inProgress = await Task.countDocuments({ user: userId, status: 'in-progress' });
        const completed = await Task.countDocuments({ user: userId, status: 'completed' });

        res.json({
            total,
            pending,
            inProgress,
            completed
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task stats' });
    }
};
