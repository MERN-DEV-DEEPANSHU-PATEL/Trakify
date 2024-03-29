// src/features/taskSlice.ts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

// STORE TASK RELATED DATA AND PERSFORM CURD OPERATION ON IT
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status !== "Completed") {
        state.tasks.splice(index, 1);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
