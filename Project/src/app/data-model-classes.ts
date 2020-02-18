import { Subscription } from 'rxjs';

// Subscription Class

export class Subscriptions {
  _id: string;
  subName: string;
  subPeriod: number;
  subBoxType: string;
  subPrice: number;
  isActive: boolean;
  date: String;
}

// User Class
export class User {
  _id: string;
  userName: {type: string; unique: true; required: true};
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  statusActivated: boolean;
  statusLocked: boolean;
  isAdmin: boolean;
  streetName: string;
  streetNumber: number;
  unit: number;
  province: string;
  country: string;
  postalCode: string;
  subscriptionInfo?: Subscriptions[];
  pastDeliveries?: Subscriptions[];
}

//Reviews Class
export class Reviews {
    subId: String;
    userId: String;
    subName: String;
    userFullName: String;
    review: String;
    date: String;
    rating: String;
}
