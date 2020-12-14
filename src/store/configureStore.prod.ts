import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import api from "../middleware/api";
import rootReducer, { RootState } from "../reducers";

const configureStore = (preloadedState?: RootState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, api)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
