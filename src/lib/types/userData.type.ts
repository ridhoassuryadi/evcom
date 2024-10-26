export interface IUser {
  message: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface TokenExpiredError {
  expiredAt: string;
  message: string;
  name: string;
}
