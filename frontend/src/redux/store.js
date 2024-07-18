import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
  },
});

export default store;
