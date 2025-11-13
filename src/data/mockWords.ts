import type { Word } from '@/types';

/**
 * Mock word data for development and testing
 * In production, this would be fetched from a backend API or bundled database
 */
export const mockWords: Word[] = [
  // ANIMALS - 6 words
  {
    id: 'word-cat',
    text: 'cat',
    translations: { en: 'cat', es: 'gato' },
    phonetic: '/kæt/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=512',
    audioUrl: {
      en: 'https://example.com/audio/cat_en.mp3',
      es: 'https://example.com/audio/gato_es.mp3',
    },
    tags: ['pet', 'mammal'],
  },
  {
    id: 'word-dog',
    text: 'dog',
    translations: { en: 'dog', es: 'perro' },
    phonetic: '/dɔɡ/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=512',
    audioUrl: {
      en: 'https://example.com/audio/dog_en.mp3',
      es: 'https://example.com/audio/perro_es.mp3',
    },
    tags: ['pet', 'mammal'],
  },
  {
    id: 'word-bird',
    text: 'bird',
    translations: { en: 'bird', es: 'pájaro' },
    phonetic: '/bɜrd/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=512',
    audioUrl: {
      en: 'https://example.com/audio/bird_en.mp3',
      es: 'https://example.com/audio/pajaro_es.mp3',
    },
    tags: ['flying'],
  },
  {
    id: 'word-fish',
    text: 'fish',
    translations: { en: 'fish', es: 'pez' },
    phonetic: '/fɪʃ/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=512',
    audioUrl: {
      en: 'https://example.com/audio/fish_en.mp3',
      es: 'https://example.com/audio/pez_es.mp3',
    },
    tags: ['water', 'pet'],
  },
  {
    id: 'word-elephant',
    text: 'elephant',
    translations: { en: 'elephant', es: 'elefante' },
    phonetic: '/ˈɛl.ɪ.fənt/',
    syllableCount: 3,
    category: 'animals',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=512',
    audioUrl: {
      en: 'https://example.com/audio/elephant_en.mp3',
      es: 'https://example.com/audio/elefante_es.mp3',
    },
    tags: ['wild', 'mammal', 'big'],
  },
  {
    id: 'word-butterfly',
    text: 'butterfly',
    translations: { en: 'butterfly', es: 'mariposa' },
    phonetic: '/ˈbʌt.ɚ.flaɪ/',
    syllableCount: 3,
    category: 'animals',
    difficulty: 3,
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=512',
    audioUrl: {
      en: 'https://example.com/audio/butterfly_en.mp3',
      es: 'https://example.com/audio/mariposa_es.mp3',
    },
    tags: ['flying', 'insect', 'colorful'],
  },

  // FOOD - 6 words
  {
    id: 'word-apple',
    text: 'apple',
    translations: { en: 'apple', es: 'manzana' },
    phonetic: '/ˈæp.əl/',
    syllableCount: 2,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=512',
    audioUrl: {
      en: 'https://example.com/audio/apple_en.mp3',
      es: 'https://example.com/audio/manzana_es.mp3',
    },
    tags: ['fruit', 'healthy'],
  },
  {
    id: 'word-banana',
    text: 'banana',
    translations: { en: 'banana', es: 'plátano' },
    phonetic: '/bəˈnæn.ə/',
    syllableCount: 3,
    category: 'food',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=512',
    audioUrl: {
      en: 'https://example.com/audio/banana_en.mp3',
      es: 'https://example.com/audio/platano_es.mp3',
    },
    tags: ['fruit', 'yellow'],
  },
  {
    id: 'word-bread',
    text: 'bread',
    translations: { en: 'bread', es: 'pan' },
    phonetic: '/brɛd/',
    syllableCount: 1,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=512',
    audioUrl: {
      en: 'https://example.com/audio/bread_en.mp3',
      es: 'https://example.com/audio/pan_es.mp3',
    },
    tags: ['staple'],
  },
  {
    id: 'word-milk',
    text: 'milk',
    translations: { en: 'milk', es: 'leche' },
    phonetic: '/mɪlk/',
    syllableCount: 1,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=512',
    audioUrl: {
      en: 'https://example.com/audio/milk_en.mp3',
      es: 'https://example.com/audio/leche_es.mp3',
    },
    tags: ['drink', 'dairy'],
  },
  {
    id: 'word-pizza',
    text: 'pizza',
    translations: { en: 'pizza', es: 'pizza' },
    phonetic: '/ˈpiːt.sə/',
    syllableCount: 2,
    category: 'food',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=512',
    audioUrl: {
      en: 'https://example.com/audio/pizza_en.mp3',
      es: 'https://example.com/audio/pizza_es.mp3',
    },
    tags: ['favorite', 'dinner'],
  },
  {
    id: 'word-cookie',
    text: 'cookie',
    translations: { en: 'cookie', es: 'galleta' },
    phonetic: '/ˈkʊk.i/',
    syllableCount: 2,
    category: 'food',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=512',
    audioUrl: {
      en: 'https://example.com/audio/cookie_en.mp3',
      es: 'https://example.com/audio/galleta_es.mp3',
    },
    tags: ['snack', 'sweet'],
  },

  // FAMILY - 4 words
  {
    id: 'word-mom',
    text: 'mom',
    translations: { en: 'mom', es: 'mamá' },
    phonetic: '/mɑm/',
    syllableCount: 1,
    category: 'family',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=512',
    audioUrl: {
      en: 'https://example.com/audio/mom_en.mp3',
      es: 'https://example.com/audio/mama_es.mp3',
    },
    tags: ['parent'],
  },
  {
    id: 'word-dad',
    text: 'dad',
    translations: { en: 'dad', es: 'papá' },
    phonetic: '/dæd/',
    syllableCount: 1,
    category: 'family',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1543690555-663abe4a0146?w=512',
    audioUrl: {
      en: 'https://example.com/audio/dad_en.mp3',
      es: 'https://example.com/audio/papa_es.mp3',
    },
    tags: ['parent'],
  },
  {
    id: 'word-baby',
    text: 'baby',
    translations: { en: 'baby', es: 'bebé' },
    phonetic: '/ˈbeɪ.bi/',
    syllableCount: 2,
    category: 'family',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=512',
    audioUrl: {
      en: 'https://example.com/audio/baby_en.mp3',
      es: 'https://example.com/audio/bebe_es.mp3',
    },
    tags: ['young'],
  },
  {
    id: 'word-sister',
    text: 'sister',
    translations: { en: 'sister', es: 'hermana' },
    phonetic: '/ˈsɪs.tɚ/',
    syllableCount: 2,
    category: 'family',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=512',
    audioUrl: {
      en: 'https://example.com/audio/sister_en.mp3',
      es: 'https://example.com/audio/hermana_es.mp3',
    },
    tags: ['sibling'],
  },

  // TOYS - 4 words
  {
    id: 'word-ball',
    text: 'ball',
    translations: { en: 'ball', es: 'pelota' },
    phonetic: '/bɔl/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=512',
    audioUrl: {
      en: 'https://example.com/audio/ball_en.mp3',
      es: 'https://example.com/audio/pelota_es.mp3',
    },
    tags: ['play', 'round'],
  },
  {
    id: 'word-doll',
    text: 'doll',
    translations: { en: 'doll', es: 'muñeca' },
    phonetic: '/dɑl/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=512',
    audioUrl: {
      en: 'https://example.com/audio/doll_en.mp3',
      es: 'https://example.com/audio/muneca_es.mp3',
    },
    tags: ['play'],
  },
  {
    id: 'word-blocks',
    text: 'blocks',
    translations: { en: 'blocks', es: 'bloques' },
    phonetic: '/blɑks/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=512',
    audioUrl: {
      en: 'https://example.com/audio/blocks_en.mp3',
      es: 'https://example.com/audio/bloques_es.mp3',
    },
    tags: ['building', 'play'],
  },
  {
    id: 'word-train',
    text: 'train',
    translations: { en: 'train', es: 'tren' },
    phonetic: '/treɪn/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=512',
    audioUrl: {
      en: 'https://example.com/audio/train_en.mp3',
      es: 'https://example.com/audio/tren_es.mp3',
    },
    tags: ['vehicle', 'play'],
  },

  // COLORS - 4 words
  {
    id: 'word-red',
    text: 'red',
    translations: { en: 'red', es: 'rojo' },
    phonetic: '/rɛd/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/FF0000/FFFFFF?text=RED',
    audioUrl: {
      en: 'https://example.com/audio/red_en.mp3',
      es: 'https://example.com/audio/rojo_es.mp3',
    },
    tags: ['primary'],
  },
  {
    id: 'word-blue',
    text: 'blue',
    translations: { en: 'blue', es: 'azul' },
    phonetic: '/blu/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/0000FF/FFFFFF?text=BLUE',
    audioUrl: {
      en: 'https://example.com/audio/blue_en.mp3',
      es: 'https://example.com/audio/azul_es.mp3',
    },
    tags: ['primary'],
  },
  {
    id: 'word-yellow',
    text: 'yellow',
    translations: { en: 'yellow', es: 'amarillo' },
    phonetic: '/ˈjɛl.oʊ/',
    syllableCount: 2,
    category: 'colors',
    difficulty: 2,
    imageUrl: 'https://via.placeholder.com/512/FFFF00/000000?text=YELLOW',
    audioUrl: {
      en: 'https://example.com/audio/yellow_en.mp3',
      es: 'https://example.com/audio/amarillo_es.mp3',
    },
    tags: ['primary'],
  },
  {
    id: 'word-green',
    text: 'green',
    translations: { en: 'green', es: 'verde' },
    phonetic: '/ɡrin/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/00FF00/000000?text=GREEN',
    audioUrl: {
      en: 'https://example.com/audio/green_en.mp3',
      es: 'https://example.com/audio/verde_es.mp3',
    },
    tags: ['secondary'],
  },

  // BODY - 2 words
  {
    id: 'word-hand',
    text: 'hand',
    translations: { en: 'hand', es: 'mano' },
    phonetic: '/hænd/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=512',
    audioUrl: {
      en: 'https://example.com/audio/hand_en.mp3',
      es: 'https://example.com/audio/mano_es.mp3',
    },
    tags: ['body-part'],
  },
  {
    id: 'word-foot',
    text: 'foot',
    translations: { en: 'foot', es: 'pie' },
    phonetic: '/fʊt/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=512',
    audioUrl: {
      en: 'https://example.com/audio/foot_en.mp3',
      es: 'https://example.com/audio/pie_es.mp3',
    },
    tags: ['body-part'],
  },
];

/**
 * Get words filtered by category
 */
export const getWordsByCategory = (category: string): Word[] => {
  return mockWords.filter((word) => word.category === category);
};

/**
 * Get words filtered by difficulty
 */
export const getWordsByDifficulty = (difficulty: number): Word[] => {
  return mockWords.filter((word) => word.difficulty === difficulty);
};

/**
 * Get a single word by ID
 */
export const getWordById = (id: string): Word | undefined => {
  return mockWords.find((word) => word.id === id);
};

/**
 * Get random words from a category
 */
export const getRandomWords = (
  category?: string,
  count: number = 5
): Word[] => {
  let words = category
    ? mockWords.filter((w) => w.category === category)
    : mockWords;

  // Shuffle and take count
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
