export interface UserModel {
  name: string;
  email: string;
  password: string;
  token?: string;
  role?: string;
}
