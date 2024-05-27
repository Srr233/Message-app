import { Note } from "../Note.interface";

export interface NewNoteProps {
  closeNote: () => void;
  addNewNoteDashboard: (note: Note) => void;
}
