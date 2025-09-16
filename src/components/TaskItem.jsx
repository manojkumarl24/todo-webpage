export default function TaskItem({ task, dispatch, onSelect }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderBottom: "1px solid #ddd",
        cursor: "pointer" }}
      onClick={() => onSelect(task)}
    >
      <span>{task.title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{task.status || "pending"}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect({ ...task, editMode: true });
          }}
        >
          ✏️
        </button>
        <button onClick={(e) => {
                  e.stopPropagation(); 
                  dispatch({ type: "DELETE_TASK", payload: task.id });
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
