/**
 * Type definitions for Interactive Story Time feature
 */

export interface StoryWord {
  text: string;
  start: number; // Character position in the full text
  end: number;
  audioUrl?: string; // Optional audio for individual word
}

export interface StoryPage {
  id: string;
  text: string;
  words: StoryWord[];
  imageUrl: string;
  audioUrl?: string; // Full page narration
  duration?: number; // Narration duration in ms
}

export interface Story {
  id: string;
  title: string;
  titleTranslations: Record<string, string>;
  author?: string;
  coverImageUrl: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  ageRange: string; // e.g., "3-5"
  pages: StoryPage[];
  tags: string[];
  language: string;
}

export interface StoryProgress {
  storyId: string;
  currentPage: number;
  completed: boolean;
  timesRead: number;
  lastReadAt: Date;
}
