<<<<<<< HEAD
import { Task } from "@/lib/tasks";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-gray-900">No tasks yet</p>
        <p className="mt-2 text-sm text-gray-500">
          Add your first task to start today&apos;s execution list.
        </p>
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
        />
      ))}
    </ul>
  );
=======
import { Task } from "@/lib/tasks";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm font-medium text-gray-900">No tasks yet</p>
        <p className="mt-2 text-sm text-gray-500">
          Add your first task to start today&apos;s execution list.
        </p>
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
        />
      ))}
    </ul>
  );
>>>>>>> 55ef278 (feat: add task deletion and improve task interaction UX)
}