import React, { Component } from "react";
import { List } from "../../components/list/List";
import { ListProps } from "../../interfaces/list/ListProps.interface";
import { getAllMessages } from "../../services/requests";
import { NewNoteComponent } from "../../components/note/NewNoteComponent";
import { WorkflowState } from "../../interfaces/workflow/WorkflowState.interface";
import { Notes } from "../../components/note/Notes";

export class NotesWorkflow extends Component<{}, WorkflowState> {
  state: Readonly<WorkflowState> = {
    NewNoteComponentBlockOpened: false,
    notes: [],
    currentNoteId: null,
    searchText: "",
  };
  componentDidMount = async () => {
    this.setState({
      notes: await getAllMessages(),
    });
  };

  createNewComponent = async () => {
    this.setState({
      NewNoteComponentBlockOpened: true,
    });
  };

  private selectNote = (id: string | null) => {
    this.setState({ currentNoteId: id });
  };

  private deleteNote = (id: string | null) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((v) => v.id !== id),
      currentNoteId: null,
    }));
  };

  private searchByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { value } = event.currentTarget;
    this.setState({ searchText: value });
  };
  render(): React.ReactNode {
    const { notes } = this.state;

    return (
      <div className="dashboard__panel">
        <div className="dashboard__list">
          <input
            type="text"
            className="dashboard__search"
            placeholder="&#128269;"
            onChange={this.searchByTitle}
          />
          <List
            notes={notes as ListProps[]}
            selectNote={this.selectNote}
            currentNoteId={this.state.currentNoteId}
            searchText={this.state.searchText}
          />
        </div>

        <div className="dashboard__notes__wrapper">
          <button
            className="note__button__addNew"
            onClick={this.createNewComponent}
          >
            Create a Note
          </button>
          {this.state.NewNoteComponentBlockOpened ? (
            <NewNoteComponent
              closeNote={() => {
                this.setState({ NewNoteComponentBlockOpened: false });
              }}
              addNewNoteDashboard={(note) => {
                this.setState(({ notes }) => {
                  const oldNotesCopy = notes.slice();
                  oldNotesCopy.push(note);
                  return { notes: oldNotesCopy };
                });
              }}
            />
          ) : (
            ""
          )}
          {
            <Notes
              currentNoteId={this.state.currentNoteId}
              deleteNote={this.deleteNote}
              notes={this.state.notes}
              selectNote={this.selectNote}
            />
          }
        </div>
      </div>
    );
  }
}
