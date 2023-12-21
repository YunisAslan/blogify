type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  profileImg: string;
  isAdmin: boolean;
};

type Publisher = {
  id: string;
  username: string;
  email: string;
  password: string;
  backgroundImg: string;
  profileImg: string;
  name: string;
  description: string;
  joinedDate: string;
};

type News = {
  id: string;
  title: string;
  newsBody: string;
  linkURL: string;
  thumbnailImg: string;
  createdAt: string;
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
