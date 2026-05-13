import { Task } from "@/lib/tasks";

type TaskItemProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <li
      className={`group flex items-start justify-between gap-3 rounded-2xl border bg-white px-4 py-4 shadow-sm transition ${
        task.completed
          ? "border-gray-100 opacity-60"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mt-1 h-4 w-4"
        />

        <span
          className={`text-sm leading-6 ${
            task.completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="text-xs text-gray-400 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
      >
        Delete
      </button>
    </li>
  );
}