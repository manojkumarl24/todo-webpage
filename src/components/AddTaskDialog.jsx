import { useState } from "react";
import { uid } from "../utils/uid";

const STATUSES = ["PENDING", "FINISHED", "ON-TRACK"];

export default function AddTaskDialog({ dispatch, onClose }) {
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(STATUSES[0]); 

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uid(),
        title: title.trim(),
        group: group.trim() || "", 
        deadline: deadline || null,
        description: description.trim(),
        status: status, 
      },
    });
    onClose();

    // reset local form state
    setTitle("");
    setGroup("");
    setDeadline("");
    setDescription("");
    setStatus(STATUSES[0]);
  };

  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <h3>Add Task</h3>

        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input placeholder="Group (optional)" value={group} onChange={(e) => setGroup(e.target.value)} />

        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* select for fixed statuses */}
        <div>
          <label style={{ fontSize: 13, color: "#444" }}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", marginTop: 6 }}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
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
  alignItems: "center",
};

const dialogStyle = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
