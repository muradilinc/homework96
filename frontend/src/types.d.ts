export interface User {
  _id: string;
  email: string;
  username: string;
  token: string;
  role: string;
  avatar: string;
}

export interface RegisterMutation {
  email: string;
  username: string;
  password: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}
