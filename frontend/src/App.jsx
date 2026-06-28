import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/api";

const initialFormData = {
  title: "",
  description: "",
  status: "Pending",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const isEditing = editingId !== null;

  // Fetch all tasks when the application loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getAllTasks();

      if (response.success) {
        setTasks(response.data);
      } else {
        setMessage({
          type: "error",
          text: response.message,
        });
      }
    } catch (error) {
      const status = error.response?.status;
      const isConnectionFailure =
        !error.response ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      setMessage({
        type: "error",
        text: isConnectionFailure
          ? "Cannot connect to server. Start the backend with: npm run dev:backend"
          : error.response?.data?.message || "Failed to fetch tasks.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = isEditing
        ? await updateTask(editingId, formData)
        : await createTask(formData);

      if (response.success) {
        if (isEditing) {
          setTasks((prev) =>
            prev.map((task) =>
              task._id === editingId ? response.data : task
            )
          );
        } else {
          setTasks((prev) => [response.data, ...prev]);
        }

        setMessage({
          type: "success",
          text: response.message,
        });

        resetForm();
      } else {
        setMessage({
          type: "error",
          text: response.message,
        });
      }
    } catch (error) {
      const status = error.response?.status;
      const isConnectionFailure =
        !error.response ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      setMessage({
        type: "error",
        text: isConnectionFailure
          ? "Cannot connect to server. Start the backend with: npm run dev:backend"
          : error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });

    setEditingId(task._id);
    setErrors({});
    setMessage({
      type: "",
      text: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      const response = await deleteTask(id);

      if (response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== id));

        if (editingId === id) {
          resetForm();
        }

        setMessage({
          type: "success",
          text: response.message,
        });
      } else {
        setMessage({
          type: "error",
          text: response.message,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to delete task.",
      });
    }
  };

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="app">
      <Navbar
        taskCount={tasks.length}
        pendingCount={pendingCount}
        completedCount={completedCount}
      />

      <main className="container">
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            <span>{message.text}</span>
            {message.type === "error" && (
              <button
                type="button"
                className="alert-retry-btn"
                onClick={() => {
                  setMessage({ type: "", text: "" });
                  fetchTasks();
                }}
              >
                Try again
              </button>
            )}
          </div>
        )}

        <TaskForm
          formData={formData}
          errors={errors}
          isEditing={isEditing}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;