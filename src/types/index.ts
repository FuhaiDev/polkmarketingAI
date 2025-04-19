export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export type PromptCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
};