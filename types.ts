export type Archetype = {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  traits: string[];
  quote: string;
  examples: string;
};

export type User = {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  email: string;
  archetype?: string;
  created_at?: string;
  updated_at?: string;
  total_journals?: number;
  longest_streak?: number;
  quests_completed?: number;
};

export type Journal = {
  id: number;
  title: string;
  body: string;
  archetype: string;
  folder_id: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export interface Folder {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export type Quest = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  goal: number;
  progress: number;
  created_at: string;
  updated_at: string;
};