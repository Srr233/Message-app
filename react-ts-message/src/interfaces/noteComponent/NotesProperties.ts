import { Note } from "../Note.interface";
import { NoteProperties } from "./NoteProperties.interface";

export interface NotesProperties extends Omit<NoteProperties, "note"> {
  notes: Note[];
}
