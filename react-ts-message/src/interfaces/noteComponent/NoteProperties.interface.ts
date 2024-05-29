import { Note } from "../Note.interface";

export interface NoteProperties {
  selectNote: (id: string | null) => void;
  deleteNote: (id: string | null) => void;
  updateNote: (note: Note) => void;
  currentNoteId: string | null;
  note: Note;
}
