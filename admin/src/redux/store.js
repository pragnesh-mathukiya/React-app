import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reduxBatch } from "@manaflair/redux-batch";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import { rootReducer } from "./rootReducer";

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  thunk,
];

if (process.env.nodeEnv !== "production") {
  let logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.nodeEnv !== "production",
  enhancers: [reduxBatch],
});

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);

export default store;
