import TaskCard from "./TaskCard";

function TaskList({ tasks, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="status-message">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="status-message">No tasks found</p>;
  }

  return (
    <section className="task-list-section" id="task-list">
      <h2 className="section-title">Your Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default TaskList;
