"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTasks } from "@/redux/taskSlice";
import Task from "@/components/Task";

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.allTasks.tasks);
  const status = useSelector((state) => state.allTasks.status);
  const error = useSelector((state) => state.allTasks.error);
  const [filter, setFilter] = useState("All");

  function handleFilter(e) {
    setFilter(e.target.value);
  }
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const filteredTasks = tasks.filter((task) =>
    filter !== "All" ? task.status === filter : task
  );
  return (
    <div>
      {tasks.length > 0 ? (
        <div className="mt-7 mb-4 flex justify-between items-center">
          <h2 className="text-[#2FB5F2]  text-xl">
            Task List ({tasks.length})
          </h2>
          <div>
            <label htmlFor="">Filter:</label>
            {"  "}
            <select
              className="text-white p-1 rounded bg-[#1F2937] border border-gray-600"
              value={filter}
              name="filter"
              onChange={(e) => handleFilter(e)}
            >
              <option value="All">All</option>
              <option value="Todo">Todo</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      ) : (
        <p className="text-center text-[#2FB5F2]  text-2xl mt-3">
          You Have No Task To Do Today!
        </p>
      )}
      {status === "loading" && (
        <p className="text-center my-3 text-xl">Loading...</p>
      )}
      {status === "error" && (
        <p className="text-center my-3 text-xl">Error: Please Try Again</p>
      )}
      <div className="mt-5">
        {filteredTasks?.map((task) => (
          <Task key={task._id} task={task} status={status} />
        ))}
        {filteredTasks.length === 0 && tasks.length > 0 && (
          <p className="text-center text-xl">"No Task Found"</p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
