import devConfigureStore from "./configureStore.dev";
import prodConfigureStore from "./configureStore.prod";

export default process.env.NODE_ENV === "production"
  ? prodConfigureStore
  : devConfigureStore;
