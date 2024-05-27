import { Note } from "../Note.interface";

export interface WorkflowState {
  currentNoteId: string | null;
  notes: Note[];
  NewNoteComponentBlockOpened: boolean;
  searchText: string;
}
