import { Gender } from "./enums";

export interface UserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  phoneNumber:string ;
}
