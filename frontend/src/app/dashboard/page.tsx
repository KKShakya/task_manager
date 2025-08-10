"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import TaskForm from "@/components/dashboard/task-form";
import TaskList from "@/components/dashboard/task-list";
import { Button } from "@/components/ui/button"; // assuming you have this or replace with your button component


type Task = {
  _id: string;
  completed: boolean;
  title:string;
};

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await apiRequest("/tasks");
      setTasks(data.tasks || []);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onChangeStatus = async (id: string, completed: boolean) => {
  try {
    await apiRequest(`/tasks/${id}`,"PATCH", {completed});

    setTasks((prev) =>prev.map((task) =>task._id === id ? { ...task, completed } : task));
  } catch (err) {
    console.error("Failed to update status", err);
  }
};

 const onUpdateTitle = async (id:string,title:string) =>{
  try {
    await apiRequest(`/tasks/${id}`, "PATCH",{title});

    setTasks((prev) =>prev.map((task) =>task._id === id ? { ...task, title } : task));
    
  } catch (err) {
    console.error("Failed to update title", err);
  }
 }


  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task locally without backend call
  const handleDelete = async (taskId: string) => {
    try {
       await apiRequest(`/tasks/${taskId}`,"DELETE");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Logout handler: clear token and redirect
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or '/' if you want
  };

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
        <Button variant="outline" size="sm" className="absolute top-5 right-5" onClick={handleLogout}>
          Logout
        </Button>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task Manager</h1>
      </div>

      {/* Add Task */}
      <TaskForm onTaskAdded={fetchTasks} />

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">
          No tasks yet. Add one above 👆
        </p>
      ) : (
        <TaskList tasks={tasks} onDelete={handleDelete} onChangeStatus={onChangeStatus} onUpdateTitle={onUpdateTitle}/>
      )}
    </main>
  );
}
