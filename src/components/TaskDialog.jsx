import { useState } from "react";

export default function TaskDialog({ task, onClose, dispatch }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "pending");

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { ...task, title, description, status }
    });
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h3>{task.editMode ? "Edit Task" : "Task Details"}</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="upcoming">Upcoming</option>
          <option value="finished">Finished</option>
        </select>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose}>Close</button>
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
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem"
};
