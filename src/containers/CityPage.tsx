import { values } from "lodash";
import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import List from "../components/List";
import Note from "../components/Note";
import { RootState } from "../reducers";
import { Note as NoteType } from "../reducers/notes";
import { loadCity, addNote, toggleCityCategory } from "../actions";

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  let slug = ownProps.match?.params.slug;
  const {
    entities: { cities, notes },
  } = state;

  const city = cities[slug];
  const allNotes = values(notes);
  const cityNotes = allNotes.filter((note) => note.cityId === slug);
  return {
    slug,
    city,
    cityNotes,
  };
};

const connector = connect(mapStateToProps, {
  loadCity,
  addNote,
  toggleCityCategory,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

type ParamsType = {
  slug: string;
};

type OwnProps = RouteComponentProps<ParamsType> & {};

function CityPage({
  city,
  cityNotes,
  loadCity,
  slug,
  addNote,
  toggleCityCategory,
}: PropsFromRedux & OwnProps) {
  function handleAddNoteClick() {
    addNote({
      content: "",
      cityId: city.id,
      cityName: `${city.location?.name}, ${city.location?.country}`,
    });
  }

  function handleRefreshClick() {
    loadCity(slug, undefined, true);
  }

  function handleStarClick() {
    toggleCityCategory({
      id: city.id,
      category: city.isFavorite ? "unfavorite" : "favorite",
    });
  }

  function handleBookmarkClick() {
    toggleCityCategory({
      id: city.id,
      category: city.isBookmarked ? "unbookmark" : "bookmark",
    });
  }

  useEffect(() => {
    loadCity(slug, ["current"]);
  }, [slug, loadCity]);

  function renderNote(note: NoteType) {
    return <Note note={note} key={note.id} />;
  }
  if (!city || city.fetchStatus === "loading") {
    return (
      <h1>
        <i>Loading City...</i>
      </h1>
    );
  }

  return (
    <div className="mw6 pa3">
      <div className="flex justify-center">
        <div className="flex flex-column items-center">
          <button
            onClick={handleRefreshClick}
            className="bg-white b mb3 pv2 ph3"
          >
            Refresh
          </button>
          <p className="f7 mb3">
            Last refresed at {city.current?.observationTime}
          </p>
        </div>
      </div>
      <div style={{ minHeight: "16rem" }}>
        <div className="flex justify-center">
          <div className="w5 flex justify-between mb2">
            <button
              onClick={handleStarClick}
              className="br2 ph2 pv2  f7 w3 bg-white ba  b--light-silver"
            >
              {city.isFavorite ? "unstar" : "star"}
            </button>
            <button
              onClick={handleBookmarkClick}
              className="br2 ph2 pv2 f7  w3 bg-white ba b--light-silver"
            >
              {city.isBookmarked ? "unmark" : "mark"}
            </button>
          </div>
        </div>
        <div className="flex justify-center mb3 ">
          <div className="br3 bg-white w5 pa3 mb3">
            <h1 className="f3 fw6 tc mid-gray pb2">{city.location?.name}</h1>
            <p className="f6 mid-gray tc">{city.location?.country}</p>
            <div className="flex justify-center pa2">
              <img
                className="br-100 ba w2 h2 b--silver"
                src={city.current?.weatherIcons[0]}
                alt={city.current?.weatherDescriptions[0]}
              />
            </div>
            <div className="flex justify-between items-end">
              <p className="f2 mid-gray b">
                {city.current?.temperature}
                <span className="f3 mid-gray"> °c</span>
              </p>
              <p className="f6 mid-gray">
                Feels like {city.current?.feelslike}°c
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={handleAddNoteClick} className="bg-white b mb3 pv2 ph3">
          Add Note
        </button>
      </div>
      <div className="flex-wrap flex">
        <List
          items={cityNotes}
          renderItem={renderNote}
          loadingLabel={`Loading Notes`}
          isFetching={false}
          emptyStateLabel={"Click 'Add Note' to make a note for this city"}
        />
      </div>
    </div>
  );
}

export default withRouter(connector(CityPage));
