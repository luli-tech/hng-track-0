export interface User {
  email: string;
  name: string;
  stack: string;
}

export interface MeResponse {
  status: string;
  user: User;
  timestamp: string;
  fact: string;
}
export interface MeErrorResponse {
  status: string;
  message: string;
  timestamp: string;
}
