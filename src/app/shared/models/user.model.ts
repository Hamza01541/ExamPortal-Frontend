import { IQuestionnaire } from "src/app/modules/admin/model/Questionair.model";

export class User {
  _id?: string = "";
  name?: Name = new Name();
  cellPhone?: string = "";
  email: string = '';
  password: string | null = "";
  createdAt?: Date | number;
  updatedAt?: Date | number;
  role?: string = "";
  token?: string = "";
  questions?: any;
}
  

export class Name {
  first: string = "";
  middle?: string = "";
  last?: string = "";
}