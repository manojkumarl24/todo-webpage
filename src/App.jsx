import { useState } from "react";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";
import TaskDialog from "./components/TaskDialog";
import ThemeToggle from "./components/ThemeToggle";
import useTasks from "./hooks/useTasks";
import { SORT_OPTIONS } from "./constants";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [filterGroups, setFilterGroups] = useState([]);
  const [filterStatuses, setFilterStatuses] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);

  const { tasks, visibleTasks, groups, addTask, updateTask, deleteTask, updateProgress } = useTasks({
    sortBy,
    filterGroups,
    filterStatuses
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
  <ThemeProvider>
    <Layout>
        <div style={{ flex: 7, borderRight: "1px solid #ccc", padding: "1rem" }}>
          <header style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Tasks</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <ThemeToggle />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value={SORT_OPTIONS.NEWEST}>Newest</option>
                <option value={SORT_OPTIONS.OLDEST}>Oldest</option>
                <option value={SORT_OPTIONS.HIGH_PRIORITY}>High Priority</option>
                <option value={SORT_OPTIONS.LOW_PRIORITY}>Low Priority</option>
              </select>
              <button onClick={() => setShowAddDialog(true)}>Add Task</button>
            </div>
          </header>

          <TaskList tasks={visibleTasks} onSelect={(t) => setSelectedTask(t)} />
        </div>

        <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, borderBottom: "1px solid #ccc", padding: "1rem" }}>
            <h3>Filter by Group</h3>
            {groups.length === 0 ? (
              <p style={{ color: "#666" }}>No groups yet — add tasks with a group</p>
            ) : (
              <select multiple value={filterGroups} onChange={(e) => setFilterGroups(Array.from(e.target.selectedOptions, o=>o.value))} style={{ width: "100%" }}>
                {groups.map((g) => (<option key={g} value={g}>{g}</option>))}
              </select>
            )}
          </div>

          <div style={{ flex: 1, padding: "1rem" }}>
            <h3>Filter by Status</h3>
            <select multiple value={filterStatuses} onChange={(e) => setFilterStatuses(Array.from(e.target.selectedOptions, o=>o.value.toUpperCase()))} style={{ width: "100%" }}>
              {["TO-DO","IN-PROGRESS","FINISHED","PENDING","LATE FINISH"].map((s)=>(
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {showAddDialog && <AddTaskDialog onAddTask={addTask} onClose={() => setShowAddDialog(false)} />}

        {selectedTask && (
          <TaskDialog
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            updateProgress={updateProgress}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}
      </Layout>
    </ThemeProvider>
  );
}
