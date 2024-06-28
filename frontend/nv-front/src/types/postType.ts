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

interface HistoryPost {
  title: string;
  thumbnail: string | null;
  thumbnail_url: string | null;
  upvote_count: number;
  downvote_count: number;
}

interface User {
  username: string;
  full_name: string;
}

export interface History {
  id: string;
  user: User;
  post: HistoryPost;
  interaction_type: "upvote" | "downvote" | "read" | "share";
  created_at: string; 
}

export interface SearchHistory {
  id: string;
  user: User;
  searched_text: string;
  created_at: string;
}