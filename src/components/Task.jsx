import { useDispatch } from "react-redux";
import { updateTask } from "@/redux/taskSlice";
import { useState } from "react";
import PopUp from "./PopUp";
function Task({ task, status }) {
  const [isEdit, setIsEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [updatedTask, setUptatedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  });
  const dispatch = useDispatch();

  function handleUpdateTask(e, idToUpdate) {
    e.preventDefault();
    setIsEdit(false);
    dispatch(updateTask({ id: idToUpdate, updatedTaskData: updatedTask }));
  }
  return (
    <div>
      {!isEdit ? (
        <div
          key={task._id}
          className="border border-gray-700 p-2 rounded-xl flex  justify-between mb-4 bg-[#1F2937] "
        >
          <div className="break-words w-[50%]">
            <h3 className="text-lg md:text-xl text-[#2FB5F2]  capitalize mb-1">
              {task.title}{" "}
              <span
                className={`text-sm md:text-lg ${
                  task.priority === "High" ? "text-[#FF5722]" : "text-[#FFC107]"
                }`}
              >
                ({task.priority})
              </span>
            </h3>
            <p className="text-sm md:text-xl">{task.description}</p>
            <p
              className={`text-sm md:text-xl ${
                task.status === "In-Progress"
                  ? "text-[#2FB5F2]"
                  : task.status === "Todo"
                  ? "text-[#FF5722]"
                  : "text-[#8BC34A]"
              }`}
            >
              Status: {task.status}
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-[#4CAF50] hover:bg-[#388E3C] p-2 rounded text-sm md:text-xl"
              onClick={() => {
                setIsEdit((prev) => !prev);
                setShowPopUp(false);
              }}
            >
              Edit
            </button>
            <button
              className="bg-[#F44336] hover:bg-[#D32F2F] p-2 rounded text-sm md:text-xl"
              onClick={() => setShowPopUp(true)}
            >
              Delete
            </button>
            {showPopUp && (
              <PopUp
                setShowPopUp={setShowPopUp}
                idToDelete={task._id}
                title={task.title}
              />
            )}
          </div>
        </div>
      ) : (
        <form
          key={task._id * 3}
          className="border border-gray-700 p-5 rounded-xl flex justify-between  mb-4 bg-[#1F2937] "
        >
          <div>
            {status === "loading" && (
              <p className="text-center my-3 text-xl">Loading...</p>
            )}
            {status === "error" && (
              <p className="text-center my-3 text-xl">
                Error: Please Try Again
              </p>
            )}
            <div className="flex gap-1 ">
              <input
                className="w-[50%] text-xl text-[#2FB5F2]  capitalize bg-[#121212] mb-2 p-1 rounded"
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={(e) =>
                  setUptatedTask({
                    ...updatedTask,
                    [e.target.name]: e.target.value,
                  })
                }
              />

              <select
                className="bg-[#121212] text-white p-1 rounded  border border-gray-600 "
                value={updatedTask.priority}
                name="priority"
                onChange={(e) =>
                  setUptatedTask({
                    ...updatedTask,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <input
              className="bg-[#121212] my-2 p-1 rounded"
              type="text"
              name="description"
              value={updatedTask.description}
              onChange={(e) =>
                setUptatedTask({
                  ...updatedTask,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div className="w-fit">
              <select
                className="bg-[#121212] text-white p-2 rounded w-full border border-gray-600"
                value={updatedTask.status}
                name="status"
                onChange={(e) =>
                  setUptatedTask({
                    ...updatedTask,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="Todo">ToDo</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className="bg-[#4CAF50] hover:bg-[#388E3C] p-2 rounded"
              onClick={(e) => handleUpdateTask(e, task._id)}
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Task;
