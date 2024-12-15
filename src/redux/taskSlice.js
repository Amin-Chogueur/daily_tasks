import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for getting all tasks
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tasks");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for creating a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tasks", taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Async thunk for deleting task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (idToDelete, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/tasks/${idToDelete}`);
      return { _id: idToDelete }; // Return the deleted task ID for filtering in the Redux store
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Async thunk for updating task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTaskData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, updatedTaskData);
      return { id, ...updatedTaskData }; // Return updated task with its ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Task slice
const taskSlice = createSlice({
  name: "allTasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createTask lifecycle
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // Handle getTasks lifecycle
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      //handle delete Lifcycle
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      // handle update lifecycle
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload.id ? { ...task, ...action.payload } : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
