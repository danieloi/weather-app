import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import useCurrentLocation from "../components/useCurrentLocation";
import configureStore from "../store/configureStore";
import App from "./App";
import CityPage from "./CityPage";

type Props = {
  store: ReturnType<typeof configureStore>;
};

export default function Root({ store }: Props) {
  useCurrentLocation();

  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Route exact path="/" component={App} />
        <Route path="/:slug" component={CityPage} />
      </div>
    </Provider>
  );
}
