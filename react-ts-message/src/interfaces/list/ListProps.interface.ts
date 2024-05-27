export interface ListProps {
  title: string;
  id: string;
}

export interface ListOptions {
  notes: ListProps[];
  selectNote: (id: string) => void;
}
