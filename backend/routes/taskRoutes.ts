import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from '../controllers/taskController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/stats', getTaskStats);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
