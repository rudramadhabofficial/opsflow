import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { createTask, getTasks, getTaskById, updateTaskStatus, uploadEvidence } from '../controllers/taskController';
import { upload } from '../middleware/upload';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'MANAGER']), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id/status', updateTaskStatus);
router.post('/:id/evidence', upload.single('image'), uploadEvidence);

export default router;
