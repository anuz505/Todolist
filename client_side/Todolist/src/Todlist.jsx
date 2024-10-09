import { useState, useEffect } from "react";
import axios from "axios";
import AddTaskForm from "./addtask.jsx";
import "./todolist.css";
export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [readMoreTaskID, setReadMore] = useState(null);

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          withCredentials: true,
        });

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching the API:", error);
      }
    };

    fetchapi();
  }, []);

  const readmore = (taskId) => {
    setReadMore(readMoreTaskID === taskId ? null : taskId);
  };
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatusChange = async (taskId, taskStatus) => {
    try {
      const updatedTask = {
        status: taskStatus === "incomplete" ? "complete" : "incomplete",
      };
      await axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTask, {
        withCredentials: true,
      });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: updatedTask.status } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {" "}
      <div className="todolist-container">
        <h1>Todo List</h1>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <input
                type="checkbox"
                checked={task.status === "complete"}
                onChange={() => handleStatusChange(task._id, task.status)}
              />
              <span className="task-title">{task.title}</span>
              <button onClick={() => readmore(task._id)}>
                {readMoreTaskID === task._id ? "Read Less" : "Read More"}
              </button>
              {readMoreTaskID === task._id && (
                <div className="task-details">
                  <p>{task.description}</p>
                  <p>{task.date}</p>
                </div>
              )}
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
