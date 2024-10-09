import { useState } from "react";
import axios from "axios";

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Initialize date

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, date };
      const response = await axios.post(
        "http://localhost:3000/tasks",

        newTask,
        { withCredentials: true }
      );
      onTaskAdded(response.data);
      setTitle("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]); // Reset date to current date
    } catch (error) {
      console.error("Error adding the task:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}
