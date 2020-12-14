import { sortBy, values } from "lodash";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CityListItem from "../components/CityListItem";
import List from "../components/List";
import { RootState } from "../reducers";
import { City } from "../reducers/cities";
import "./App.css";

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = RouteComponentProps & {};

const mapStateToProps = (state: RootState) => {
  const {
    entities: { cities },
  } = state;

  const allCities = values(cities);
  const favoriteCities = sortBy(
    allCities.filter((city) => city.isFavorite),
    [(city) => city.location?.name]
  );
  const bookmarkedCities = sortBy(
    allCities.filter((city) => city.isBookmarked),
    [(city) => city.location?.name]
  );

  return {
    bookmarkedCities,
    favoriteCities,
  };
};

function App({ bookmarkedCities, favoriteCities }: PropsFromRedux & OwnProps) {
  function renderCity(city: City) {
    return <CityListItem city={city} key={city.id} />;
  }

  return (
    <div className="mw6 pa3">
      <div className="mb3">
        <h2 className="f3 b dark-gray mb3">Favorites</h2>
        <List
          items={favoriteCities}
          emptyStateLabel="Click star to favorite a city"
          loadingLabel={"Loading Favorites"}
          isFetching={false}
          renderItem={renderCity}
        />
      </div>
      <div className="mb3">
        <h2 className="f3 b dark-gray mb3">Bookmarks</h2>
        <List
          items={bookmarkedCities}
          emptyStateLabel="Click mark to bookmark a city"
          loadingLabel={"Loading Favorites"}
          isFetching={false}
          renderItem={renderCity}
        />
      </div>
    </div>
  );
}

// export default App;

const connector = connect(mapStateToProps, {});

export default withRouter(connector(App));
