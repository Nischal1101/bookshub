export interface Book {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}
