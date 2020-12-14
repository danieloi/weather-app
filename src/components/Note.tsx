import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { deleteNote, editNote } from "../actions";
import { Note as NoteType } from "../reducers/notes";

const connector = connect(null, { editNote, deleteNote });

type PropsFromRedux = ConnectedProps<typeof connector>;

type OwnProps = {
  note: NoteType;
};

export default connector(Note);

function Note({ note, deleteNote, editNote }: PropsFromRedux & OwnProps) {
  const [beenEdited, setBeenEdited] = useState(false);
  const [content, setContent] = useState(note.content);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBeenEdited(true);
    setContent(e.target.value);
  }

  function handleSaveClick() {
    editNote({
      ...note,
      content,
    });
    setBeenEdited(false);
  }

  function handleDeleteClick() {
    deleteNote({
      id: note.id,
    });
  }

  return (
    <div className="mr3 mb3">
      <div className="mb1">
        <button
          className="bg-white ba pv1 ph2 f7"
          disabled={!beenEdited}
          onClick={() => handleSaveClick()}
        >
          Save
        </button>
        <button
          className="bg-white ba pv1 ph2 f7"
          onClick={() => handleDeleteClick()}
        >
          Delete
        </button>
      </div>
      <textarea
        style={{
          resize: "none",
        }}
        value={content}
        onChange={handleChange}
        className="h5 w5 ba bg-white shadow-3 pa3 lh-copy"
        placeholder="Add Content Here"
      />
    </div>
  );
}
