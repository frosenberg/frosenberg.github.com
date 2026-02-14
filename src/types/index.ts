export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface Patent {
  title: string;
  number: string;
  abstract: string;
  filed: string;
  dateOfPatent: string;
  assignee: string;
  inventors: string[];
}

export interface Publication {
  authors: string;
  year: number;
  title: string;
  venue: string;
  pdfPath?: string;
  award?: string;
  type: "journal" | "conference" | "book-chapter" | "thesis";
}

export interface OpenSourceProject {
  name: string;
  description: string;
  url: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export interface FocusArea {
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
