import TaskItem from "./TaskItem";

export default function TaskList({ tasks, dispatch, onSelect }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            dispatch={dispatch}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  );
}
