import React, { useState } from "react";
import { uid } from "../utils/uid";
import { PRIORITIES, DEFAULT_STATUS } from "../constants";

export default function AddTaskDialog({ onClose = () => {}, onAddTask, dispatch }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(PRIORITIES[1] || "MEDIUM");

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const payload = {
      id: uid(),
      title: title.trim(),
      group: group.trim(),
      deadline: deadline || null,
      description: description.trim(),
      priority,
      progress: 0, // default
      status: DEFAULT_STATUS,
      createdAt: new Date().toISOString()
    };

    if (typeof onAddTask === "function") {
      onAddTask(payload);
    } else if (typeof dispatch === "function") {
      dispatch({ type: "ADD_TASK", payload });
    } else {
      console.warn("No onAddTask or dispatch provided, task not saved", payload);
    }

    setTitle("");
    setGroup("");
    setDeadline("");
    setDescription("");
    setPriority(PRIORITIES[1] || "MEDIUM");
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h3>Add Task</h3>

        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Group (optional)" value={group} onChange={(e) => setGroup(e.target.value)} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div>
          <label style={{ fontSize: 13, color: "#333" }}>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
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
