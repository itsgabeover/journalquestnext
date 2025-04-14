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
  email: string;
  username: string; // ✅ Is this present?
  first_name?: string;
  last_name?: string;
  archetype?: string;
};

export type Journal = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  // Add more fields as needed
};
