import { Subscription } from 'rxjs';

// Subscription Class

export class Subscriptions {
  subName: string;
  subPeriod: number;
  subBoxType: string;
  subPrice: number;
  isActive: Boolean
}

// User Class
export class User {
  _id: string;
  userName: {type: string; unique: true; required: true};
  fullName: string;
  password: string;
  statusActivated: boolean;
  statusLocked: boolean;
  isAdmin: boolean;
  subscriptionInfo?: Subscriptions[];
}
