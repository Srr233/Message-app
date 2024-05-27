import { Component, ReactNode } from "react";
import { Note } from "../../interfaces/Note.interface";
import { NewNoteProps } from "../../interfaces/noteComponent/NewNoteProps";
import { createNewNoteF } from "../../services/requests";

export class NewNoteComponent extends Component<
  NewNoteProps,
  Omit<Note, "id">
> {
  state: Readonly<Omit<Note, "id">> = {
    text: "",
    title: "",
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

  closeNote = () => {
    this.props.closeNote();
  };

  createNewNote = async () => {
    const { title, text } = this.state;
    if (!title || !text) {
      if (!title) alert("Title is empty");
      if (!text) alert("Text is empty");
    } else {
      const newNote = await createNewNoteF({
        title: this.state.title,
        text: this.state.text,
      });
      this.props.addNewNoteDashboard(newNote);
      this.closeNote();
    }
  };

  render(): ReactNode {
    return (
      <div className="note__wrapper openedClass">
        <div className={"note"}>
          <button className="note__close" onClick={this.closeNote}>
            x
          </button>
          <div className="note__content">
            <textarea
              name="title"
              className="note__title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <textarea
              name="text"
              className="note__text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <div className="note__buttons">
            <button onClick={this.createNewNote}>CREATE</button>
            <button onClick={this.closeNote}>CLOSE</button>
          </div>
        </div>
      </div>
    );
  }
}
