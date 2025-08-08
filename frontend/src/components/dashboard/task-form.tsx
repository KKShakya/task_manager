"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

export default function TaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await apiRequest("/tasks", "POST", { title });
      toast.success("Task added successfully");
      setTitle("");
      onTaskAdded();
    } catch (err: any) {
      toast.error(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleAddTask} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}
