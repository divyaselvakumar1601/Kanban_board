
// ✅ KanbanBoard.jsx (updated to use dnd-kit)
import React, { useContext, useState } from "react";
import Column from "./Column";
import { TaskContext } from "../context/TaskContext";
import { DndContext } from "@dnd-kit/core";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const KanbanBoard = ({ darkMode }) => {
  const { tasks, setTasks, addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("todo");

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask({ title, description: desc, priority, status });
    setTitle("");
    setDesc("");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const updatedTasks = tasks.map((task) =>
      task.id === active.id ? { ...task, status: over.id } : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="px-10">
      <div className="flex gap-2 mb-6 pl-[220px]">
        <input className={`border px-2 py-1 rounded w-1/5 ${darkMode ? 'text-white bg-gray-700' : 'text-black bg-white'}`} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={`border px-2 py-1 rounded w-1/3 ${darkMode ? 'text-white bg-gray-700' : 'text-black bg-white'}`} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <select className={`border px-2 py-1 rounded ${darkMode ? 'text-white bg-gray-700' : 'text-black bg-white'}`} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select className={`border px-2 py-1 rounded ${darkMode ? 'text-white bg-gray-700' : 'text-black bg-white'}`} value={status} onChange={(e) => setStatus(e.target.value)}>
          {columns.map(col => (
            <option key={col.id} value={col.id}>{col.title}</option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-1 rounded">Add Task</button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex justify-center gap-6">
          {columns.map((col) => (
            <Column
              key={col.id}
              columnId={col.id}
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
