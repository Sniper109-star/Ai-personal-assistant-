import { NextResponse } from "next/server";

type Task = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  createdAt: string;
};

type TaskStore = {
  tasks: Task[];
  nextId: number;
};

const taskStore: TaskStore = { tasks: [], nextId: 1 };

export async function GET() {
  return NextResponse.json({ tasks: taskStore.tasks });
}

export async function POST(request: Request) {
  try {
    const { title, priority } = await request.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const task: Task = {
      id: `${taskStore.nextId++}`,
      title: title.trim(),
      priority: priority || "medium",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    taskStore.tasks.unshift(task);
    return NextResponse.json({ task });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, priority, completed } = await request.json();

    const taskIndex = taskStore.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const task = taskStore.tasks[taskIndex];
    task.title = title || task.title;
    task.priority = priority || task.priority;
    task.completed = completed ?? task.completed;

    taskStore.tasks[taskIndex] = task;
    return NextResponse.json({ task });
  } catch {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const taskIndex = taskStore.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    taskStore.tasks.splice(taskIndex, 1);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
