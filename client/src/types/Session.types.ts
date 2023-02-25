export interface ISessionState {
  username: string;
  isLoggedIn: boolean;
}

export type ISessionAction = Omit<ISessionState, "username">;
