import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  description: string;
  featuredImage: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  createdAt: Timestamp;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  published: boolean;
  publishedAt: Timestamp | null;
  tags: string[];
  createdAt: Timestamp;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
}
