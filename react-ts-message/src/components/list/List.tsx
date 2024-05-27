import { Component, ReactNode } from "react";
import {
  ListOptions,
  ListProps,
} from "../../interfaces/list/ListProps.interface";

export class List extends Component<ListOptions, {}> {
  handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    this.props.selectNote(
      event.currentTarget.getAttribute("data-id") as string
    );
  };
  render(): ReactNode {
    const { currentNoteId, searchText } = this.props;
    const { notes } = this.props;
    let resultNotes: ListProps[] = notes;
    if (!notes.length) return;
    if (searchText)
      resultNotes = notes.filter((v) => {
        return v.title
          .toLowerCase()
          .match(new RegExp("^" + searchText.toLowerCase(), "g"));
      });
    const list = resultNotes.map((l) => {
      return (
        <li
          key={l.id}
          data-id={l.id}
          onClick={this.handleClick}
          className={currentNoteId === l.id ? "noteListChoosen" : ""}
        >
          {l.title}
        </li>
      );
    });
    return <ul>{list}</ul>;
  }
}
