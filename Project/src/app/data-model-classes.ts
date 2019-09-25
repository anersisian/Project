// User Account Class

export class UserAccount {
  userName: { type: string; unique: true };
  fullName?: string;
  password: string;
  passwordConfirm: string;
  statusActivated: boolean;
  statusLocked?: boolean;
  role: string;
  claims?: [string];
}

// Student Class
export class User {
  _id: string;
  username: string;
  firstName: string;
  secondName: string;
  birthDate: Date;
  email: string;
  address: string;
  password: string;
}
