function TaskCard({ task, onEdit, onDelete }) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const statusClass =
    task.status === "Completed" ? "status-completed" : "status-pending";

  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`status-badge ${statusClass}`}>{task.status}</span>
      </div>

      <p className="task-card-description">{task.description}</p>

      <p className="task-card-date">Created: {formattedDate}</p>

      <div className="task-card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
