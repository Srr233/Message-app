import { BACKEND_URL } from "../constants";
import { Note } from "../interfaces/Note.interface";

export const getAllMessages = async () => {
  const request = await fetch(`${BACKEND_URL}/api/messages`, {
    headers: {
      Authorization: "bearer " + localStorage.getItem("access_token"),
    },
  });
  return await request.json();
};

export const patchNote = async (note: Note): Promise<Note> => {
  const request = await fetch(
    `${BACKEND_URL}/api/messages/message/update/${note.id}`,
    {
      headers: {
        Authorization: "bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
      method: "PATCH",
    }
  );

  if (request.status !== 200)
    throw new Error(JSON.stringify(await request.json()));

  return await request.json();
};

export const deleteCurrentNote = async (
  id: string
): Promise<{ affected: number }> => {
  const request = await fetch(`${BACKEND_URL}/api/messages/delete/${id}`, {
    headers: {
      Authorization: "bearer " + localStorage.getItem("access_token"),
    },
    method: "DELETE",
  });

  if (request.status !== 200)
    throw new Error(JSON.stringify(await request.json()));

  return await request.json();
};
export const createNewNoteF = async (note: Omit<Note, "id">): Promise<Note> => {
  const request = await fetch(`${BACKEND_URL}/api/messages/create`, {
    headers: {
      Authorization: "bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(note),
  });
  if (request.status !== 201) throw new Error(await request.json());
  return await request.json();
};

export const validateUser = async () => {
  return await fetch(`${BACKEND_URL}/api/messages`, {
    headers: {
      Authorization: "bearer " + localStorage.getItem("access_token"),
    },
  });
};
