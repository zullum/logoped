import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import type { WordCategory } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface CategorySelectorProps {
  selectedCategory: WordCategory;
  onCategoryChange: (category: WordCategory) => void;
}

const categories: Array<{
  id: WordCategory;
  nameKey: string;
  emoji: string;
  color: string;
}> = [
  {
    id: 'animals',
    nameKey: 'kid.categories.animals',
    emoji: '🐶',
    color: 'bg-primary-500',
  },
  {
    id: 'food',
    nameKey: 'kid.categories.food',
    emoji: '🍎',
    color: 'bg-coral-500',
  },
  {
    id: 'family',
    nameKey: 'kid.categories.family',
    emoji: '👨‍👩‍👧',
    color: 'bg-sunshine-500',
  },
  {
    id: 'toys',
    nameKey: 'kid.categories.toys',
    emoji: '🎮',
    color: 'bg-grass-500',
  },
  {
    id: 'colors',
    nameKey: 'kid.categories.colors',
    emoji: '🎨',
    color: 'bg-lavender-500',
  },
  {
    id: 'body',
    nameKey: 'kid.categories.body',
    emoji: '👋',
    color: 'bg-primary-500',
  },
];

export function CategorySelector({
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <View className="mb-md">
      <Text
        className="text-base text-text-medium mb-sm"
        style={{ fontFamily: 'Nunito_600SemiBold' }}
      >
        {t('kid.pictureCards.chooseCategory')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id;

          // Color mapping for selected state
          const colorMap: Record<string, string> = {
            'bg-primary-500': '#4A90E2',
            'bg-coral-500': '#EF476F',
            'bg-sunshine-500': '#FFD166',
            'bg-grass-500': '#06D6A0',
            'bg-lavender-500': '#9B89B3',
          };

          const backgroundColor = isSelected
            ? colorMap[category.color]
            : '#F3F4F6'; // gray-100

          return (
            <View key={category.id} style={{ marginRight: 8 }}>
              <Pressable
                onPress={() => onCategoryChange(category.id)}
                accessibilityLabel={`${t(category.nameKey)} category`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <View
                  style={{
                    backgroundColor,
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    minWidth: 100,
                    shadowColor: isSelected ? '#000' : 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0.1 : 0,
                    shadowRadius: isSelected ? 4 : 0,
                    elevation: isSelected ? 3 : 0,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{category.emoji}</Text>
                  <Text
                    style={{
                      fontFamily: 'Quicksand_600SemiBold',
                      fontSize: 14,
                      color: isSelected ? '#FFFFFF' : '#374151',
                    }}
                  >
                    {t(category.nameKey)}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
