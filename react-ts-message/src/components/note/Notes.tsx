import { Component, ReactNode } from "react";
import { WorkflowState } from "../../interfaces/workflow/WorkflowState.interface";
import { NotesProperties } from "../../interfaces/noteComponent/NotesProperties";
import { NoteComponent } from "./NoteComponent";

export class Notes extends Component<
  NotesProperties,
  Pick<WorkflowState, "currentNoteId">
> {
  state: Readonly<Pick<WorkflowState, "currentNoteId">> = {
    currentNoteId: this.props.currentNoteId,
  };

  render(): ReactNode {
    const { deleteNote, selectNote, updateNote, currentNoteId, notes } =
      this.props;

    if (!notes) return <div className="loading">LOADING</div>;
    return notes.map((note) => {
      return (
        <NoteComponent
          updateNote={updateNote}
          key={note.id}
          deleteNote={deleteNote}
          selectNote={selectNote}
          note={note}
          currentNoteId={currentNoteId}
        />
      );
    });
  }
}
