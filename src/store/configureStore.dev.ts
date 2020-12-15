import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import api from "../middleware/api";
import rootReducer, { RootState } from "../reducers";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "weather-app-root-dev",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (preloadedState?: RootState) => {
  const store = createStore<RootState & PersistPartial, any, any, any>(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, api))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      // This fetches the new state of the above reducer.
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  let persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
