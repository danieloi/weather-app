import { merge, omit } from "lodash";
import { nanoid } from "nanoid";
import { NotesEntityActionTypes } from "../actions";
import { City } from "./cities";

export type Note = {
  id: string;
  content: string;
  /**
   * foreign id
   */
  cityId: City["id"];
  /**
   * name so if city is removed, we can still identify it
   *
   */
  cityName: string;
};

export type NotesEntityState = Record<string, Note>;

let initialState: NotesEntityState = {};

export const notes = (state = initialState, action: NotesEntityActionTypes) => {
  switch (action.type) {
    case "entities/ADD_NOTE":
      const newId = nanoid(6);
      return merge({}, state, {
        [newId]: {
          id: newId,
          ...action.payload,
        },
      });

    case "entities/EDIT_NOTE":
      return merge({}, state, {
        [action.payload.id]: {
          ...action.payload,
        },
      });

    case "entities/DELETE_NOTE":
      return omit(state, action.payload.id);

    default:
      return state;
  }
};
