import { useReducer, useState } from "react";
import { taskReducer } from "./reducers/taskReducer";
import useLocalStorage from "./hooks/useLocalStorage";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";
import TaskDialog from "./components/TaskDialog";
import { ThemeToggle } from "./components/ThemeToggle";

const STATUSES = ["PENDING", "FINISHED", "ON-TRACK"];

export default function App() {
  const [tasks, dispatch] = useLocalStorage("tasks", [], taskReducer);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [selectedGroups, setSelectedGroups] = useState([]); 
  const [selectedStatuses, setSelectedStatuses] = useState([]); 

  const groups = Array.from(
    new Set(tasks.map((t) => (t.group ? String(t.group).trim() : "")).filter(Boolean))
  );

  const displayedTasks = tasks.filter((t) => {
    const groupVal = t.group ? String(t.group) : "";
    const statusVal = t.status ? String(t.status).toUpperCase() : "";
    const groupMatch = selectedGroups.length === 0 || selectedGroups.includes(groupVal);
    const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(statusVal);
    return groupMatch && statusMatch;
  });

  const onGroupSelectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedGroups(values);
  };

  const onStatusSelectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedStatuses(values);
  };

  return (
    <Layout>
      <div style={{ flex: 7, borderRight: "1px solid #ccc", padding: "1rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tasks</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <ThemeToggle />
            <button onClick={() => setShowAddDialog(true)}>Add Task</button>
          </div>
        </header>

        <TaskList tasks={displayedTasks} dispatch={dispatch} onSelect={setSelectedTask} />
      </div>

      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        {/* Group filter (user-defined groups only) */}
        <div style={{ flex: 1, borderBottom: "1px solid #ccc", padding: "1rem" }}>
          <h3>Filter by Group</h3>
          {groups.length === 0 ? (
            <p style={{ color: "#666", fontSize: 13, marginTop: 6 }}>No groups yet — add tasks with a group</p>
          ) : (
            <select
              multiple
              size={Math.min(6, groups.length)}
              value={selectedGroups}
              onChange={onGroupSelectChange}
              style={{ width: "100%", marginTop: 8 }}
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={{ flex: 1, padding: "1rem" }}>
          <h3>Filter by Status</h3>
          <select
            multiple
            size={Math.min(6, STATUSES.length)}
            value={selectedStatuses}
            onChange={onStatusSelectChange}
            style={{ width: "100%", marginTop: 8 }}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div style={{ marginTop: 10, color: "#666", fontSize: 13 }}>
            <div>Tip: hold Ctrl / Cmd to multi-select.</div>
            <div>Leave any filter empty to include all.</div>
          </div>
        </div>
      </div>

      {showAddDialog && <AddTaskDialog dispatch={dispatch} onClose={() => setShowAddDialog(false)} />}

      {selectedTask && <TaskDialog task={selectedTask} onClose={() => setSelectedTask(null)} dispatch={dispatch} />}
    </Layout>
  );
}
