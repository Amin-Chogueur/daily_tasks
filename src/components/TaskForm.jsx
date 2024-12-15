"use client";
import { createTask } from "@/redux/taskSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TaskForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.allTasks);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "High",
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTask(taskData));
    setTaskData({
      title: "",
      description: "",
      status: "Todo",
      priority: "High",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1F2937] px-2 py-4 rounded-lg">
      <h2 className="text-[#2FB5F2]  text-xl md:text-2xl mb-5 text-center">
        Create New Task
      </h2>

      <input
        className="bg-[#121212] text-white p-2 rounded block w-full mb-4 border border-gray-600"
        type="text"
        placeholder="Your Task..."
        required
        value={taskData.title}
        onChange={(e) =>
          setTaskData({ ...taskData, [e.target.name]: e.target.value })
        }
        name="title"
      />

      <input
        className="bg-[#121212] text-white p-2 rounded block w-full mb-4 border border-gray-600"
        type="text"
        placeholder="Description..."
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, [e.target.name]: e.target.value })
        }
        name="description"
      />

      <div className="flex justify-between gap-5 mb-4">
        <div className="flex-1">
          <label htmlFor="status" className="text-[#8BC34A] block mb-1">
            Status:
          </label>
          <select
            className="bg-[#121212] text-white p-2 rounded w-full border border-gray-600"
            value={taskData.status}
            onChange={(e) =>
              setTaskData({ ...taskData, [e.target.name]: e.target.value })
            }
            name="status"
          >
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="priority" className="text-[#FF5722] block mb-1">
            Priority:
          </label>
          <select
            className="bg-[#121212] text-white p-2 rounded w-full border border-gray-600"
            value={taskData.priority}
            onChange={(e) =>
              setTaskData({ ...taskData, [e.target.name]: e.target.value })
            }
            name="priority"
          >
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#2FB5F2]  hover:bg-[#008C9E] text-white font-bold p-3 rounded mt-4 block mx-auto w-full transition-all"
      >
        CREATE
      </button>
    </form>
  );
}

export default TaskForm;
