export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  topics: string[];
  lang?: string;
}