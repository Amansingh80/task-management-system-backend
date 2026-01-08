import { Router } from 'express';
import { body } from 'express-validator';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from '../controllers/task.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all tasks (with pagination, filtering, search)
router.get('/', getTasks);

// Get single task
router.get('/:id', getTask);

// Create task
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  ],
  validate,
  createTask
);

// Update task
router.patch(
  '/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim(),
    body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  ],
  validate,
  updateTask
);

// Delete task
router.delete('/:id', deleteTask);

// Toggle task status
router.post('/:id/toggle', toggleTask);

export default router;