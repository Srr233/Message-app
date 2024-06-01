export interface EnterRequest {
  requestFunc: (
    event: React.MouseEvent<HTMLButtonElement>,
    login: string,
    password: string
  ) => Promise<boolean>;
}
