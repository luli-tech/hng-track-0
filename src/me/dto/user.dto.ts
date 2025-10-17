export class UserDto {
  email: string;
  name: string;
  stack: string;
}
export class MeResponseDto {
  status: string;
  user?: UserDto;
  timestamp: string;
  fact?: string;
  message?: string;
}
