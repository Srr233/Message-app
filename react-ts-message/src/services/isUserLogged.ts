import { validateUser } from "./requests";

export const isUserLogged = async (): Promise<boolean> => {
  const res = await validateUser();
  return res.status === 200 ? true : false;
};
