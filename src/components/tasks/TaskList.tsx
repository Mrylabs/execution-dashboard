import { Task } from "@/lib/tasks";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  emptyTitle: string;
  emptyDescription: string;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onPriorityChange: (id: string, priority: Task["priority"]) => void;
};

export default function TaskList({
  tasks,
  emptyTitle,
  emptyDescription,
  onToggle,
  onDelete,
  onStatusChange,
  onPriorityChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-6 text-center">
        <p className="text-sm font-medium text-gray-900">{emptyTitle}</p>
        <p className="mt-2 text-sm text-gray-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </ul>
  );
}
