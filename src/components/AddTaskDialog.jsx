import React, { useState } from "react";

const AddTaskDialog = ({ onAddTask, statuses }) => {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState(statuses[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, group: group.trim() || "General", status });
    setTitle("");
    setGroup("");
    setStatus(statuses[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Task group (optional)"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskDialog;
