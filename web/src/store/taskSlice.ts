// src/features/taskSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Task {
  id: number;
  title: string;
  description: string;
  startDate: number;
  endDate?: number;
  status: "Pending" | "In Progress" | "Completed" | "Deployed" | "Deferred";
  assignee: string;
  priority: "P0" | "P1" | "P2";
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<any>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status !== "Completed") {
        state.tasks.splice(index, 1);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
