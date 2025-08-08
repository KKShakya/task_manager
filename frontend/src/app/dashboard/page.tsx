"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import TaskForm from "@/components/dashboard/task-form";
import {ThemeToggle} from "@/components/theme-toggler";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await apiRequest("/tasks");
      setTasks(data.tasks || []);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </div>
      <TaskForm onTaskAdded={fetchTasks} />
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks yet</p>
        ) : (
          tasks.map((task: any) => (
            <Card key={task._id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                Status: {task.completed ? "✅ Done" : "⏳ Pending"}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
