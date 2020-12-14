import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootActionType } from "../actions";
import { cities } from "./cities";
import { notes } from "./notes";

export type EntitiesState = ReturnType<typeof entities>;

const entities = combineReducers({
  notes,
  cities,
});

const appReducer = combineReducers({
  entities,
});

export type RootState = ReturnType<typeof appReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

function rootReducer(state: RootState | undefined, action: RootActionType) {
  return appReducer(state, action);
}

export default rootReducer;
