import express from 'express'
import cors from 'cors'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/tasks', async (req, res) => {
  try {
    const { search } = req.query

    const tasks = await prisma.task.findMany({
      where: {
        name: {
          contains: search || '',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!tasks) {
      return res.status(400).json({ error: 'Error' })
    }

    return res.json({ tasks })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params

    const task = await prisma.task.findUnique({
      where: { id },
    })
    if (!task) {
      return res.status(404).json({ error: 'Not found' })
    }

    return res.json({ task })
  } catch (error) {
    if (error.code === 'P2001') {
      return res.status(404).json({ error: 'Not found' })
    }
    return res.status(500).json({ error: error.message })
  }
})

app.post('/tasks/new', async (req, res) => {
  try {
    const { name } = req.body
    if (!name || typeof name !== 'string') {
      return res.status(422).json({ error: 'Name is required' })
    }

    const task = await prisma.task.create({
      data: {
        name,
      },
    })
    if (!task) {
      return res.status(400).json({ error: 'Task not created' })
    }

    return res.status(201).json({ message: 'Task created' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'Missing task id' })
    }

    await prisma.task.delete({
      where: { id },
    })

    res.status(202).json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => {
  console.log('Server started in http://localhost:3000')
})
