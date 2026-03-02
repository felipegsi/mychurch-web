export type UserRole = "admin" | "leader" | "member";
export type UserStatus = "active" | "pending";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};
