import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./auth";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
