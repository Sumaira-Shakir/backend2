export interface UserTypes {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  experience: number;
  skills: string[];
}
export interface UserLoginInterface {
  email: string;
  password: string;
  role: "admin" | "user";
}
