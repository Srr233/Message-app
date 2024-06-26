import React, { Component } from "react";
import { NoteProperties } from "../../interfaces/noteComponent/NoteProperties.interface";
import { Note, PrevState } from "../../interfaces/Note.interface";
import { patchNote, deleteCurrentNote } from "../../services/requests";
import { ENTER_KEY, QUESTION_BEFORE_DELETE } from "../../constants";

export class NoteComponent extends Component<
  NoteProperties,
  Omit<Note, "id"> & PrevState
> {
  mainRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  state: Readonly<Note & PrevState> = {
    ...this.props.note,
    prevState: this.props.note,
  };

  openNote = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { id } = this.props.note;
    this.props.selectNote(id);
    this.mainRef.current?.classList.add("openedClass");
  };

  closeNote = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.selectNote(null);
    this.mainRef.current?.classList.remove("openedClass");
  };

  updateByPressing = (event?: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event?.code === ENTER_KEY && event?.ctrlKey) this.updateNote();
  };

  updateNote = async () => {
    const note: Note = {
      id: this.props.note.id,
      text: this.state.text,
      title: this.state.title,
    };

    const response: Note = await patchNote(note);

    this.setState({ text: note.text, title: note.title, prevState: note });
    this.props.updateNote(response);
    this.props.selectNote(null);
  };

  deleteNote = async () => {
    const answer = window.confirm(QUESTION_BEFORE_DELETE);
    if (!answer) return;
    const { id } = this.props.note;
    await deleteCurrentNote(id);
    this.props.deleteNote(id);
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const name = currentTarget.getAttribute("name");
    if (name === "title") {
      this.setState({ title: currentTarget.value });
    } else {
      this.setState({ text: currentTarget.value });
    }
  };

  render() {
    const { currentNoteId, note } = this.props;
    const isOpened = currentNoteId === note.id;

    const TextAreas = () => {
      if (!isOpened) {
        return (
          <>
            <h3>{this.state.prevState.title}</h3>
            <p>{this.state.prevState.text}</p>
          </>
        );
      }
      return (
        <>
          <textarea
            name="title"
            className="note__title"
            value={this.state.title}
            onChange={this.handleChange}
            onKeyUp={this.updateByPressing}
          />
          <textarea
            name="text"
            className="note__text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyUp={this.updateByPressing}
          />
        </>
      );
    };

    return (
      <div
        ref={this.mainRef}
        className={"note__wrapper " + (isOpened ? "openedClass" : "")}
      >
        <div className={"note"} onClick={this.openNote}>
          <button className="note__close" onClick={this.closeNote}>
            x
          </button>
          <div className="note__content">{TextAreas()}</div>
          <div className="note__buttons">
            <button onClick={this.updateNote}>SAVE</button>
            <button onClick={this.deleteNote}>DELETE</button>
          </div>
        </div>
      </div>
    );
  }
}
