export interface User {
  code: string;
  createdAt: string;
  email: string;
  provider?: string;
  role: string;
  username: string;

  emails?: any[];
  photos?: any[];
}