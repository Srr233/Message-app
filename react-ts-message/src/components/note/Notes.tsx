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
    return this.props.notes.map((note) => {
      return (
        <NoteComponent
          key={note.id}
          deleteNote={this.props.deleteNote}
          selectNote={this.props.selectNote}
          note={note}
          currentNoteId={this.props.currentNoteId}
        />
      );
    });
  }
}
