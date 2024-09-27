import { useState, useEffect } from "react";
import axios from "axios";

export default function Todolist() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.description} {task.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
