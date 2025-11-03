
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id:string;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
  comments: Comment[];
}
