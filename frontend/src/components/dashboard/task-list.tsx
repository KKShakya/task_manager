

"use client";
import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:3003/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-2 border rounded-md shadow-sm dark:border-gray-700"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}
