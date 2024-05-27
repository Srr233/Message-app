import { Note } from "../Note.interface";

export interface DashboardState {
  currentNote?: string;
  notes: Note[];
}
