import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

//Creating A Redux Store

const store = configureStore({
  reducer: {
    task: taskReducer, //Store all task data
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
