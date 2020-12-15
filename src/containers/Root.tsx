import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "../components/Navbar";
import useCurrentLocation from "../components/useCurrentLocation";
import configureStore from "../store/configureStore";
import App from "./App";
import CityPage from "./CityPage";

type OwnProps = {
  store: ReturnType<typeof configureStore>["store"];
  persistor: ReturnType<typeof configureStore>["persistor"];
};

export default function Root({ store, persistor }: OwnProps) {
  useCurrentLocation();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div>
          <Navbar />
          <Route exact path="/" component={App} />
          <Route path="/:slug" component={CityPage} />
        </div>
      </PersistGate>
    </Provider>
  );
}
