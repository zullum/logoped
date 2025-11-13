import type { Story } from '@/types/story.types';

/**
 * Sample stories for Interactive Story Time
 * In production, these would be fetched from a CMS or database
 */

export const stories: Story[] = [
  {
    id: 'story-cat-and-dog',
    title: 'The Cat and the Dog',
    titleTranslations: {
      en: 'The Cat and the Dog',
      es: 'El Gato y el Perro',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=512',
    difficulty: 1,
    ageRange: '3-5',
    language: 'en',
    tags: ['animals', 'friendship'],
    pages: [
      {
        id: 'page-1',
        text: 'This is Cat. Cat is orange.',
        words: [
          { text: 'This', start: 0, end: 4 },
          { text: 'is', start: 5, end: 7 },
          { text: 'Cat', start: 8, end: 11 },
          { text: 'Cat', start: 13, end: 16 },
          { text: 'is', start: 17, end: 19 },
          { text: 'orange', start: 20, end: 26 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=512',
      },
      {
        id: 'page-2',
        text: 'This is Dog. Dog is brown.',
        words: [
          { text: 'This', start: 0, end: 4 },
          { text: 'is', start: 5, end: 7 },
          { text: 'Dog', start: 8, end: 11 },
          { text: 'Dog', start: 13, end: 16 },
          { text: 'is', start: 17, end: 19 },
          { text: 'brown', start: 20, end: 25 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=512',
      },
      {
        id: 'page-3',
        text: 'Cat and Dog are friends!',
        words: [
          { text: 'Cat', start: 0, end: 3 },
          { text: 'and', start: 4, end: 7 },
          { text: 'Dog', start: 8, end: 11 },
          { text: 'are', start: 12, end: 15 },
          { text: 'friends', start: 16, end: 23 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=512',
      },
    ],
  },

  {
    id: 'story-big-sun',
    title: 'The Big Sun',
    titleTranslations: {
      en: 'The Big Sun',
      es: 'El Gran Sol',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=512',
    difficulty: 1,
    ageRange: '3-5',
    language: 'en',
    tags: ['nature', 'weather'],
    pages: [
      {
        id: 'page-1',
        text: 'The sun is big and bright.',
        words: [
          { text: 'The', start: 0, end: 3 },
          { text: 'sun', start: 4, end: 7 },
          { text: 'is', start: 8, end: 10 },
          { text: 'big', start: 11, end: 14 },
          { text: 'and', start: 15, end: 18 },
          { text: 'bright', start: 19, end: 25 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=512',
      },
      {
        id: 'page-2',
        text: 'The sun makes us warm.',
        words: [
          { text: 'The', start: 0, end: 3 },
          { text: 'sun', start: 4, end: 7 },
          { text: 'makes', start: 8, end: 13 },
          { text: 'us', start: 14, end: 16 },
          { text: 'warm', start: 17, end: 21 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=512',
      },
      {
        id: 'page-3',
        text: 'We love the sun!',
        words: [
          { text: 'We', start: 0, end: 2 },
          { text: 'love', start: 3, end: 7 },
          { text: 'the', start: 8, end: 11 },
          { text: 'sun', start: 12, end: 15 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1534629938736-b1b076531d3b?w=512',
      },
    ],
  },

  {
    id: 'story-red-ball',
    title: 'My Red Ball',
    titleTranslations: {
      en: 'My Red Ball',
      es: 'Mi Pelota Roja',
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1593005869938-8a8d3e3c0f95?w=512',
    difficulty: 1,
    ageRange: '3-5',
    language: 'en',
    tags: ['toys', 'play'],
    pages: [
      {
        id: 'page-1',
        text: 'I have a red ball.',
        words: [
          { text: 'I', start: 0, end: 1 },
          { text: 'have', start: 2, end: 6 },
          { text: 'a', start: 7, end: 8 },
          { text: 'red', start: 9, end: 12 },
          { text: 'ball', start: 13, end: 17 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1593005869938-8a8d3e3c0f95?w=512',
      },
      {
        id: 'page-2',
        text: 'I can throw the ball.',
        words: [
          { text: 'I', start: 0, end: 1 },
          { text: 'can', start: 2, end: 5 },
          { text: 'throw', start: 6, end: 11 },
          { text: 'the', start: 12, end: 15 },
          { text: 'ball', start: 16, end: 20 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1519315901367-8f5f7c46f600?w=512',
      },
      {
        id: 'page-3',
        text: 'I can catch the ball.',
        words: [
          { text: 'I', start: 0, end: 1 },
          { text: 'can', start: 2, end: 5 },
          { text: 'catch', start: 6, end: 11 },
          { text: 'the', start: 12, end: 15 },
          { text: 'ball', start: 16, end: 20 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=512',
      },
      {
        id: 'page-4',
        text: 'I love my red ball!',
        words: [
          { text: 'I', start: 0, end: 1 },
          { text: 'love', start: 2, end: 6 },
          { text: 'my', start: 7, end: 9 },
          { text: 'red', start: 10, end: 13 },
          { text: 'ball', start: 14, end: 18 },
        ],
        imageUrl: 'https://images.unsplash.com/photo-1593005869938-8a8d3e3c0f95?w=512',
      },
    ],
  },
];

/**
 * Get all available stories
 */
export const getAllStories = (): Story[] => {
  return stories;
};

/**
 * Get a story by ID
 */
export const getStoryById = (id: string): Story | undefined => {
  return stories.find((story) => story.id === id);
};

/**
 * Get stories by difficulty level
 */
export const getStoriesByDifficulty = (difficulty: number): Story[] => {
  return stories.filter((story) => story.difficulty === difficulty);
};
