import React, { useState } from "react";

export default function TaskDialog({ task, onClose = () => {}, updateProgress, updateTask, deleteTask, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [group, setGroup] = useState(task.group || "");
  const [deadline, setDeadline] = useState(task.deadline || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "");

  const handleSaveEdit = () => {
    const payload = { ...task, title: title.trim(), group: group.trim(), deadline: deadline || null, description: description.trim(), priority };
    if (typeof updateTask === "function") updateTask(payload);
    else if (typeof dispatch === "function") dispatch({ type: "UPDATE_TASK", payload });
    setEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (typeof deleteTask === "function") deleteTask(task.id);
    else if (typeof dispatch === "function") dispatch({ type: "DELETE_TASK", payload: task.id });
    onClose();
  };

  const handleUpdateProgress = () => {
    const val = prompt("Enter new progress (0-100)", String(task.progress ?? 0));
    if (val === null) return;
    const n = Number(val);
    if (Number.isNaN(n) || n < 0 || n > 100) {
      alert("Progress must be a number between 0 and 100");
      return;
    }
    if (typeof updateProgress === "function") updateProgress(task.id, n);
    else if (typeof dispatch === "function") {
      const updated = { ...task, progress: n };
      dispatch({ type: "UPDATE_TASK", payload: updated });
    }
 
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        {!editing ? (
          <>
            <h3>Task Details</h3>
            <div><strong>Title:</strong> {task.title}</div>
            <div><strong>Group:</strong> {task.group || "-"}</div>
            <div><strong>Priority:</strong> {task.priority || "-"}</div>
            <div><strong>Deadline:</strong> {task.deadline || "-"}</div>
            <div><strong>Progress:</strong> {task.progress ?? 0}%</div>
            <div><strong>Status:</strong> {task.status || ""}</div>
            <div style={{ marginTop: 8 }}><strong>Description:</strong>
              <div style={{ marginTop: 6 }}>{task.description || "-"}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button onClick={handleUpdateProgress}>Update Progress</button>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <h3>Edit Task</h3>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={group} onChange={(e) => setGroup(e.target.value)} />
            <input type="date" value={deadline || ""} onChange={(e) => setDeadline(e.target.value)} />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <input placeholder="Priority (e.g. HIGH)" value={priority} onChange={(e) => setPriority(e.target.value)} />

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const dialogStyle = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  width: "420px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
};
