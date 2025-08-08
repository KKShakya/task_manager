import TaskForm from "@/components/dashboard/task-form";
import TaskList from "@/components/dashboard/task-list";
export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <TaskForm />
      <TaskList />
    </main>
  );
}