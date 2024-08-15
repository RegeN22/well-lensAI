export interface EditUserProfileModel {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  allergies?: string[];
  diseases?: string[];
  imgUrl?: string;
}