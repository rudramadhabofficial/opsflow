import { Request, Response } from 'express';
import prisma from '../db';
import { AuthRequest } from '../middleware/auth';

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, priority, deadline, assigneeId } = req.body;
  
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        deadline: deadline ? new Date(deadline) : null,
        status: assigneeId ? 'ASSIGNED' : 'OPEN',
        assigneeId,
        creatorId: req.user!.id,
      },
    });

    await prisma.taskHistory.create({
      data: {
        taskId: task.id,
        newStatus: task.status,
        changedById: req.user!.id,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status, priority } = req.query;
    
    let whereClause: any = {};
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;

    if (req.user!.role === 'EMPLOYEE') {
      whereClause.assigneeId = req.user!.id;
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        histories: { include: { changedBy: { select: { name: true } } }, orderBy: { changedAt: 'desc' } },
        evidence: true,
      },
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (req.user!.role === 'EMPLOYEE' && task.assigneeId !== req.user!.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const taskId = req.params.id;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (req.user!.role === 'EMPLOYEE' && task.assigneeId !== req.user!.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    await prisma.taskHistory.create({
      data: {
        taskId,
        oldStatus: task.status,
        newStatus: status,
        changedById: req.user!.id,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const uploadEvidence = async (req: AuthRequest, res: Response) => {
  const taskId = req.params.id;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    // Store local path for simplicity as requested, ready for S3 swap later
    const imageUrl = `/uploads/${req.file.filename}`;

    const evidence = await prisma.taskEvidence.create({
      data: {
        taskId,
        imageUrl,
      },
    });

    res.status(201).json(evidence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
