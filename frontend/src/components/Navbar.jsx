function Navbar({ taskCount = 0, pendingCount = 0, completedCount = 0 }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <div className="navbar-brand">
          <div className="navbar-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <div className="navbar-brand-text">
            <h1 className="navbar-title">Task Tracker</h1>
            <span className="navbar-tagline">Stay organized, get things done</span>
          </div>
        </div>

        <ul className="navbar-links">
          <li>
            <button type="button" className="navbar-link" onClick={() => scrollTo("add-task")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Task
            </button>
          </li>
          <li>
            <button type="button" className="navbar-link" onClick={() => scrollTo("task-list")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              My Tasks
            </button>
          </li>
        </ul>

        <div className="navbar-stats">
          <div className="stat-pill" title="Total tasks">
            <span className="stat-value">{taskCount}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-pill stat-pending" title="Pending tasks">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-pill stat-completed" title="Completed tasks">
            <span className="stat-value">{completedCount}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
