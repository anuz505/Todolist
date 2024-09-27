import { useState, useEffect } from "react";
import axios from "axios";
import AddTaskForm from "./addtask.jsx";
export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [readMoreTaskID, setReadMore] = useState(null);

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        console.log("API response:", response.data); // Log the API response
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching the API:", error);
      }
    };

    fetchapi();
  }, []);

  console.log("Tasks state:", tasks);
  const readmore = (taskId) => {
    setReadMore(readMoreTaskID === taskId ? null : taskId);
  };
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Todo List</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => readmore(task._id)}>
              {readMoreTaskID === task._id ? "ReadLess" : "ReadMore"}
            </button>
            {readMoreTaskID === task._id && (
              <div>
                <p>{task.description}</p>
                <p>{task.date}</p>
              </div>
            )}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
