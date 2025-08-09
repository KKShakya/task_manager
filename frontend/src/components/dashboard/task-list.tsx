"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default function TaskList({
  tasks,
  onDelete,
  onChangeStatus,
}: {
  tasks: any[];
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, completed: boolean) => void;
}) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  const TaskPopup = ({
    task,
    onClose,
  }: {
    task: any;
    onClose: () => void;
  }) => {
    return (
      <div
        className="fixed inset-0  bg-opacity-100 flex justify-center items-center z-50 backdrop-blur"
        onClick={onClose}
      >
        <Card
          className="w-96 p-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex justify-between items-center mb-2 ">
            <CardTitle className="text-xl">{task.title}</CardTitle>
            <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={onClose} aria-label="Close">
              ✕
            </Button>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Status: {task.completed ? "✅ Done" : "⏳ Pending"}</p>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mb-4 w-full">
                  Change Status
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="flex flex-col">
                  <Button
                    variant={task.completed ? "ghost" : "secondary"}
                    onClick={() => {
                      onChangeStatus(task._id, false);
                      onClose();
                    }}
                    className="mb-2"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={task.completed ? "secondary" : "ghost"}
                    onClick={() => {
                      onChangeStatus(task._id, true);
                      onClose();
                    }}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => {
                onDelete(task._id);
                onClose();
              }}
            >
              Delete Task
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="w-50 max-w-60 h-50 relative cursor-pointer border border-border rounded-lg shadow-sm hover:shadow-md transition flex flex-col p-3"
            onClick={() => setOpenTaskId(task._id)}
            tabIndex={0}
            role="button"
            aria-pressed={openTaskId === task._id}
          >
            {/* Delete button top-right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id);
              }}
              aria-label={`Delete task ${task.title}`}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-red-600 hover:text-red-800 transition"
              title="Delete task"
              type="button"
            >
              <TrashIcon className="w-4 h-4 stroke-current" />
            </button>

            {/* Title */}
            <h3 className="text-sm font-semibold line-clamp-5 mt-5">{task.title}</h3>

            {/* Status */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground absolute bottom-2 left-2">
              {task.completed ? (
                <>
                  <span className="text-green-600">✅</span>
                  <span>Done</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-600">⏳</span>
                  <span>Pending</span>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Popup modal */}
      {openTaskId && (
        <TaskPopup
          task={tasks.find((t) => t._id === openTaskId)!}
          onClose={() => setOpenTaskId(null)}
        />
      )}
    </>
  );
}
