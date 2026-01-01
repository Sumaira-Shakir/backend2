import { Document } from 'mongoose';


 

export interface productTypes extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: "electronics" | "fashion" | "home" | "mobile";
  tags: string[];
  ratings: number;
}


export interface ProductPayload {
  title?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: "electronics" | "fashion" | "home" | "mobile";
  tags: string[];
  ratings: number
}