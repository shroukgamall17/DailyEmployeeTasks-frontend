import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Slices/Tasks/tasksSlice"; // Make sure the path is correct

const store = configureStore({
  reducer: {
    tasks: taskReducer, // Tasks state will be available under `tasks`
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;
