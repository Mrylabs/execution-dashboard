import { Task } from "@/lib/tasks";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-md border bg-white px-4 py-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-4 w-4"
      />

      <span
        className={`text-sm ${
          task.completed ? "text-gray-400 line-through" : "text-gray-900"
        }`}
      >
        {task.title}
      </span>
    </li>
  );
}
