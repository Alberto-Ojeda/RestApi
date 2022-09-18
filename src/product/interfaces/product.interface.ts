import { Document } from "mongoose"; //extends hereda
export interface Product extends Document {
  readonly name: string;
  readonly decription: string;
  readonly imageURL: string;
  readonly price: number;
  readonly createdAt: Date;
}