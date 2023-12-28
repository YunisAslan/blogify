type User = {
  _id?: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  profileImage: string;
  isAdmin: boolean;
  isVerified: boolean;
};

type Publisher = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  backgroundImg: string;
  profileImg: string;
  name: string;
  description: string;
  joinedDate: string;
  isVerified: boolean;
};

type AccountType = "user" | "publisher";

type News = {
  _id?: string;
  title: string;
  newsBody: string;
  linkURL: string;
  thumbnailImg: string;
  publisherId: string;
  description: string;
  tags: string[] | Tag[];
  likes: string[];
  createdAt: string;
};

type Tag = {
  _id?: string;
  name: string;
};

type Subscription = {
  _id?: string;
  userId: string;
  publisherId: string;
};

// assets typings
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}
