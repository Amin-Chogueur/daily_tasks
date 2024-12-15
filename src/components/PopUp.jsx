import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/taskSlice";

function PopUp({ setShowPopUp, idToDelete, title }) {
  const dispatch = useDispatch();

  function handleDeleteTask(idToDelete) {
    dispatch(deleteTask(idToDelete));
  }

  return (
    <div className="fixed rounded-lg bg-black flex justify-center items-center z-10 top-10 left-1/2 transform -translate-x-1/2 border-t-2 border-red-600">
      <div className="  p-4 flex flex-col justify-center items-center gap-5">
        <h2 className="text-red-600 text-lg sm:text-xl text-center">
          Are You Sure You Want To Delete This Task ? ({title})
        </h2>
        <div className="flex justify-center items-center gap-4">
          <button
            className="p-1 rounded bg-red-600"
            onClick={() => handleDeleteTask(idToDelete)}
          >
            Delete
          </button>
          <button
            className="p-1 rounded bg-green-700"
            onClick={() => setShowPopUp(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
