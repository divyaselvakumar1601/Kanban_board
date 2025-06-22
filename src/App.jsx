import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <TaskProvider>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-blue-50 text-black'}`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 pl-[630px]">Kanban Board</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="absolute right-4 top-4 px-4 py-1 rounded bg-blue-600 text-white">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        <KanbanBoard darkMode={darkMode} />
      </div>
    </TaskProvider>
  );
}

export default App;