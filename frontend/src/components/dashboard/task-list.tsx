"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Assuming you have shadcn/popover component

export default function TaskList({
  tasks,
  onDelete,
  onChangeStatus,
}: {
  tasks: any[];
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, completed: boolean) => void;
}) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <Card
          key={task._id}
          className="border border-border hover:shadow-sm transition"
        >
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg">{task.title}</CardTitle>

            <div className="flex gap-2 items-center">
              {/* Popover for status */}
              <Popover>
                <PopoverTrigger >
                  <Button variant="outline" size="sm">
                    Status: {task.completed ? "Done" : "Pending"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="flex flex-col">
                    <Button
                      variant={task.completed ? "ghost" : "secondary"}
                      onClick={() => onChangeStatus(task._id, false)}
                      className="mb-2"
                    >
                      Pending
                    </Button>
                    <Button
                      variant={task.completed ? "secondary" : "ghost"}
                      onClick={() => onChangeStatus(task._id, true)}
                    >
                      Done
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Delete Button */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>
            </div>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            {task.completed ? "✅ Done" : "⏳ Pending"}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
