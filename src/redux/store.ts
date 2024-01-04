import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./slice";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(taskApi.middleware);
  },
});
