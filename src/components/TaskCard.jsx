import React, { useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { deleteTask } = useContext(TaskContext);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    touchAction: "none",
  };

  const priorityColors = {
    Low: "bg-gray-300 text-black",
    Medium: "bg-orange-400 text-white",
    High: "bg-pink-500 text-white",
  };

  const statusColors = {
    todo: "bg-blue-100 text-blue-800",
    inprogress: "bg-orange-100 text-orange-800",
    done: "bg-green-100 text-green-800",
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "inprogress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
className="min-h-[40px] bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-4 mb-3 text-sm font-sans"
    >
      <div className="flex justify-between mb-1">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Title</h4>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 text-xs hover:underline"
        >
          delete
        </button>
      </div>

      <p className="text-white mb-3">{task.title}</p>

      <h4 className="font-semibold text-gray-800 dark:text-gray-200">Description</h4>
      <p className="mb-3">{task.description}</p>

      <div className="flex justify-between items-center mt-2">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Status</h4>

          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${statusColors[task.status]}`}>
            {getStatusLabel(task.status)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Priority</h4>

          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
