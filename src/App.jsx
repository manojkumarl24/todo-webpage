import { useReducer, useState } from "react";
import { taskReducer } from "./reducers/taskReducer";
import useLocalStorage from "./hooks/useLocalStorage";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";
import TaskDialog from "./components/TaskDialog";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const [tasks, dispatch] = useLocalStorage("tasks", [], taskReducer);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <Layout>
      {/* Left Section */}
      <div style={{ flex: 7, borderRight: "1px solid #ccc", padding: "1rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tasks</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <ThemeToggle />
            <button onClick={() => setShowAddDialog(true)}>Add Task</button>
          </div>
        </header>

        <TaskList
          tasks={tasks}
          dispatch={dispatch}
          onSelect={setSelectedTask}
        />
      </div>

      {/* Right Section */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, borderBottom: "1px solid #ccc", padding: "1rem" }}>
          <h3>Filter by Group</h3>
          {/* TODO: Add group filter logic */}
        </div>
        <div style={{ flex: 1, padding: "1rem" }}>
          <h3>Filter by Status</h3>
          {/* TODO: Add status filter logic */}
        </div>
      </div>

      {/* Dialogs */}
      {showAddDialog && (
        <AddTaskDialog
          dispatch={dispatch}
          onClose={() => setShowAddDialog(false)}
        />
      )}

      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          dispatch={dispatch}
        />
      )}
    </Layout>
  );
}
