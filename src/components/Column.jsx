import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ title, tasks, columnId }) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className="w-80 flex flex-col border rounded-lg shadow-sm p-3"
      style={{
        backgroundColor: getColumnColor(columnId),
        minHeight: "100vh",
      }}
    >
      <h2
        className="text-center text-white text-sm font-bold uppercase mb-3 bg-opacity-80 py-1 rounded"
        style={{ backgroundColor: getColumnHeaderColor(columnId) }}
      >
        {title}
      </h2>

      <div className="flex-1 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id.toString()} task={task} />
        ))}
      </div>
    </div>
  );
};

const getColumnColor = (id) => {
  switch (id) {
    case "todo":
      return "#b0c6e3";
    case "inprogress":
      return "#fbebac";
    case "done":
      return "#adffd5";
    default:
      return "#f3f4f6";
  }
};

const getColumnHeaderColor = (id) => {
  switch (id) {
    case "todo":
      return "#3b82f6";
    case "inprogress":
      return "#f97316";
    case "done":
      return "#10b981";
    default:
      return "#6b7280";
  }
};

export default Column;
