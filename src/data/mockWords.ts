import type { Word, WordCategory, DifficultyLevel } from '@/types';

/**
 * Mock word data for development and testing.
 * In a real app, this would be fetched from a backend API or bundled database.
 *
 * Image URLs are from Unsplash, which is great for placeholders.
 * Audio URLs are placeholders and will need to be replaced with real recordings.
 */
export const mockWords: Word[] = [
  // === ANIMALS (10) ===
  {
    id: 'word-cat',
    text: 'cat',
    translations: { en: 'cat', es: 'gato' },
    phonetic: '/kæt/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['flying', 'insect', 'colorful'],
  },
  {
    id: 'word-lion',
    text: 'lion',
    translations: { en: 'lion', es: 'león' },
    phonetic: '/ˈlaɪ.ən/',
    syllableCount: 2,
    category: 'animals',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['wild', 'mammal', 'cat'],
  },
  {
    id: 'word-monkey',
    text: 'monkey',
    translations: { en: 'monkey', es: 'mono' },
    phonetic: '/ˈmʌŋ.ki/',
    syllableCount: 2,
    category: 'animals',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['wild', 'mammal'],
  },
  {
    id: 'word-frog',
    text: 'frog',
    translations: { en: 'frog', es: 'rana' },
    phonetic: '/frɑɡ/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1593554835353-3263702c7a85?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['amphibian', 'green'],
  },
  {
    id: 'word-bee',
    text: 'bee',
    translations: { en: 'bee', es: 'abeja' },
    phonetic: '/biː/',
    syllableCount: 1,
    category: 'animals',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1560789409-4c28a6f5a4be?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['insect', 'flying', 'yellow'],
  },

  // === FOOD (10) ===
  {
    id: 'word-apple',
    text: 'apple',
    translations: { en: 'apple', es: 'manzana' },
    phonetic: '/ˈæp.əl/',
    syllableCount: 2,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['fruit', 'healthy', 'red'],
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['staple', 'grain'],
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['drink', 'dairy', 'white'],
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['snack', 'sweet'],
  },
  {
    id: 'word-carrot',
    text: 'carrot',
    translations: { en: 'carrot', es: 'zanahoria' },
    phonetic: '/ˈkær.ət/',
    syllableCount: 2,
    category: 'food',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['vegetable', 'orange'],
  },
  {
    id: 'word-cheese',
    text: 'cheese',
    translations: { en: 'cheese', es: 'queso' },
    phonetic: '/tʃiːz/',
    syllableCount: 1,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1589881133825-bbb3b9471b1b?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['dairy', 'yellow'],
  },
  {
    id: 'word-juice',
    text: 'juice',
    translations: { en: 'juice', es: 'jugo' },
    phonetic: '/dʒuːs/',
    syllableCount: 1,
    category: 'food',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['drink', 'fruit'],
  },
  {
    id: 'word-strawberry',
    text: 'strawberry',
    translations: { en: 'strawberry', es: 'fresa' },
    phonetic: '/ˈstrɔː.bɛr.i/',
    syllableCount: 3,
    category: 'food',
    difficulty: 3,
    imageUrl: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['fruit', 'red', 'sweet'],
  },

  // === FAMILY (6) ===
  {
    id: 'word-mom',
    text: 'mom',
    translations: { en: 'mom', es: 'mamá' },
    phonetic: '/mɑm/',
    syllableCount: 1,
    category: 'family',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['sibling'],
  },
  {
    id: 'word-brother',
    text: 'brother',
    translations: { en: 'brother', es: 'hermano' },
    phonetic: '/ˈbrʌð.ɚ/',
    syllableCount: 2,
    category: 'family',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['sibling'],
  },
  {
    id: 'word-grandma',
    text: 'grandma',
    translations: { en: 'grandma', es: 'abuela' },
    phonetic: '/ˈɡræn.mɑː/',
    syllableCount: 2,
    category: 'family',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1615213410257-42d943554752?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['grandparent'],
  },

  // === TOYS (8) ===
  {
    id: 'word-ball',
    text: 'ball',
    translations: { en: 'ball', es: 'pelota' },
    phonetic: '/bɔl/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['vehicle', 'play'],
  },
  {
    id: 'word-car',
    text: 'car',
    translations: { en: 'car', es: 'coche' },
    phonetic: '/kɑr/',
    syllableCount: 1,
    category: 'toys',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['vehicle', 'play'],
  },
  {
    id: 'word-puzzle',
    text: 'puzzle',
    translations: { en: 'puzzle', es: 'rompecabezas' },
    phonetic: '/ˈpʌz.əl/',
    syllableCount: 2,
    category: 'toys',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6324?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['game', 'play'],
  },
  {
    id: 'word-robot',
    text: 'robot',
    translations: { en: 'robot', es: 'robot' },
    phonetic: '/ˈroʊ.bɑt/',
    syllableCount: 2,
    category: 'toys',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['future', 'play'],
  },
  {
    id: 'word-dinosaur',
    text: 'dinosaur',
    translations: { en: 'dinosaur', es: 'dinosaurio' },
    phonetic: '/ˈdaɪ.nə.sɔːr/',
    syllableCount: 3,
    category: 'toys',
    difficulty: 3,
    imageUrl: 'https://images.unsplash.com/photo-1584949091598-c34d82aa72a2?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['animal', 'play'],
  },

  // === COLORS (8) ===
  {
    id: 'word-red',
    text: 'red',
    translations: { en: 'red', es: 'rojo' },
    phonetic: '/rɛd/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/FF0000/FFFFFF?text=RED',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['secondary'],
  },
  {
    id: 'word-purple',
    text: 'purple',
    translations: { en: 'purple', es: 'morado' },
    phonetic: '/ˈpɜːr.pəl/',
    syllableCount: 2,
    category: 'colors',
    difficulty: 2,
    imageUrl: 'https://via.placeholder.com/512/A020F0/FFFFFF?text=PURPLE',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['secondary'],
  },
  {
    id: 'word-orange',
    text: 'orange',
    translations: { en: 'orange', es: 'naranja' },
    phonetic: '/ˈɔːr.ɪndʒ/',
    syllableCount: 2,
    category: 'colors',
    difficulty: 2,
    imageUrl: 'https://via.placeholder.com/512/FFA500/FFFFFF?text=ORANGE',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['secondary'],
  },
  {
    id: 'word-black',
    text: 'black',
    translations: { en: 'black', es: 'negro' },
    phonetic: '/blæk/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/000000/FFFFFF?text=BLACK',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: [],
  },
  {
    id: 'word-white',
    text: 'white',
    translations: { en: 'white', es: 'blanco' },
    phonetic: '/waɪt/',
    syllableCount: 1,
    category: 'colors',
    difficulty: 1,
    imageUrl: 'https://via.placeholder.com/512/FFFFFF/000000?text=WHITE',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: [],
  },

  // === BODY (10) ===
  {
    id: 'word-hand',
    text: 'hand',
    translations: { en: 'hand', es: 'mano' },
    phonetic: '/hænd/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
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
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part'],
  },
  {
    id: 'word-eyes',
    text: 'eyes',
    translations: { en: 'eyes', es: 'ojos' },
    phonetic: '/aɪz/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1528823798732-3535a4145139?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'face'],
  },
  {
    id: 'word-nose',
    text: 'nose',
    translations: { en: 'nose', es: 'nariz' },
    phonetic: '/noʊz/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1512218824268-829399b8104f?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'face'],
  },
  {
    id: 'word-mouth',
    text: 'mouth',
    translations: { en: 'mouth', es: 'boca' },
    phonetic: '/maʊθ/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1593100163510-2d236c62ea9a?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'face'],
  },
  {
    id: 'word-ears',
    text: 'ears',
    translations: { en: 'ears', es: 'orejas' },
    phonetic: '/ɪərz/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1598243539439-b559a07b8d6a?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'face'],
  },
  {
    id: 'word-hair',
    text: 'hair',
    translations: { en: 'hair', es: 'pelo' },
    phonetic: '/hɛər/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'head'],
  },
  {
    id: 'word-tummy',
    text: 'tummy',
    translations: { en: 'tummy', es: 'barriga' },
    phonetic: '/ˈtʌm.i/',
    syllableCount: 2,
    category: 'body',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1604176422213-246568354e75?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part'],
  },
  {
    id: 'word-fingers',
    text: 'fingers',
    translations: { en: 'fingers', es: 'dedos' },
    phonetic: '/ˈfɪŋ.ɡərz/',
    syllableCount: 2,
    category: 'body',
    difficulty: 2,
    imageUrl: 'https://images.unsplash.com/photo-1508847154043-be5407f9177c?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'hand'],
  },
  {
    id: 'word-toes',
    text: 'toes',
    translations: { en: 'toes', es: 'dedos del pie' },
    phonetic: '/toʊz/',
    syllableCount: 1,
    category: 'body',
    difficulty: 1,
    imageUrl: 'https://images.unsplash.com/photo-1604537466507-7817d4c14e3c?w=512',
    audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
    tags: ['body-part', 'foot'],
  },
];

/**
 * Get words filtered by category
 */
export const getWordsByCategory = (category: WordCategory): Word[] => {
  return mockWords.filter((word) => word.category === category);
};

/**
 * Get words filtered by difficulty
 */
export const getWordsByDifficulty = (difficulty: DifficultyLevel): Word[] => {
  return mockWords.filter((word) => word.difficulty === difficulty);
};

/**
 * Get a single word by ID
 */
export const getWordById = (id: string): Word | undefined => {
  return mockWords.find((word) => word.id === id);
};

/**
 * Get random words
 */
export const getRandomWords = (
  count: number,
  category?: WordCategory,
  difficulty?: DifficultyLevel
): Word[] => {
  let words = mockWords;

  if (category) {
    words = words.filter((w) => w.category === category);
  }
  if (difficulty) {
    words = words.filter((w) => w.difficulty === difficulty);
  }

  // Shuffle and take count
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Search for words by text or translation
 */
export const getWordsBySearch = (query: string): Word[] => {
  const lowerQuery = query.toLowerCase();
  if (!lowerQuery) return [];

  return mockWords.filter(
    (word) =>
      word.text.toLowerCase().includes(lowerQuery) ||
      word.translations.es.toLowerCase().includes(lowerQuery) ||
      word.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get all unique categories and their counts
 */
export const getAllCategories = (): { category: WordCategory; count: number }[] => {
  const categoryCounts = mockWords.reduce((acc, word) => {
    acc[word.category] = (acc[word.category] || 0) + 1;
    return acc;
  }, {} as Record<WordCategory, number>);

  return Object.entries(categoryCounts).map(([category, count]) => ({
    category: category as WordCategory,
    count,
  }));
};
