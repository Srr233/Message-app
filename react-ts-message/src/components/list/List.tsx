import { Component, ReactNode } from "react";
import { ListOptions } from "../../interfaces/list/ListProps.interface";
import { WorkflowState } from "../../interfaces/workflow/WorkflowState.interface";

export class List extends Component<
  ListOptions & Pick<WorkflowState, "currentNoteId">,
  {}
> {
  handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    this.props.selectNote(
      event.currentTarget.getAttribute("data-id") as string
    );
  };
  render(): ReactNode {
    const { currentNoteId } = this.props;
    if (!this.props.notes.length) return;
    const { notes } = this.props;
    const list = notes.map((l, i) => {
      return (
        <li
          key={i}
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
