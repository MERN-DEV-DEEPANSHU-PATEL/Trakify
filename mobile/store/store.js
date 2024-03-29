import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

//Creating A Redux Store

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
