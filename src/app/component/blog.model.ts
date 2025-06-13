export interface Blog {
  id?: string;
  title: string;
  content: string;
  author: string;
  category: string;
  imageURLs: string[]; 
  publicationDate: number 
  comments?: { user: string; comment: string }[]; 
  likes?: number;
  dislikes?: number;
  likedBy?: string[];
  dislikedBy?: string[];
}
