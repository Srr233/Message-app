export interface Note {
  title: string;
  text: string;
  id: string;
  userEmail?: string;
}

export interface PrevState {
  prevState: {
    title: string;
    text: string;
    id: string;
  };
}
