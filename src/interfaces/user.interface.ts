export interface RegisterProps {
  username: string;
  password: string;
  phoneNo?: string;
  email?: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}
