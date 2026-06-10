import { Task } from "@/lib/tasks";

type TaskItemProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onPriorityChange: (id: string, priority: Task["priority"]) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onStatusChange,
  onPriorityChange,
}: TaskItemProps) {
  const isCompleted = task.status === "completed" || task.completed;

  return (
    <li
      className={`group flex flex-col gap-3 rounded-2xl border bg-white px-4 py-4 shadow-sm transition sm:flex-row sm:items-start sm:justify-between ${
        isCompleted
          ? "border-gray-100 opacity-60"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task)}
          className="mt-1 h-4 w-4"
        />

        <div className="min-w-0">
          <span
            className={`break-words text-sm leading-6 ${
              isCompleted ? "text-gray-400 line-through" : "text-gray-900"
            }`}
          >
            {task.title}
          </span>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span className="capitalize">{task.priority}</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{task.status}</span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 pl-7 sm:justify-end sm:pl-0">
        {!isCompleted && (
          <button
            type="button"
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === "tomorrow" ? "active" : "tomorrow"
              )
            }
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            {task.status === "tomorrow" ? "Move active" : "Tomorrow"}
          </button>
        )}

        {!isCompleted && (
          <select
            value={task.priority}
            onChange={(event) =>
              onPriorityChange(
                task.id,
                event.target.value as Task["priority"]
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-600 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            aria-label={`Priority for ${task.title}`}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        )}

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg px-2 py-1.5 text-xs text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
