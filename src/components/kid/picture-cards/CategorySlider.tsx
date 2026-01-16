import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { ASSETS, CATEGORY_LIST } from '../../../../app/(kid)/activities/picture-cards/assets';
import { WordCategory } from '@/types';

interface CategorySliderProps {
  selectedCategory: string;
  onCategoryChange: (category: WordCategory) => void;
}

const BG_COLORS = ['#A5D6A7', '#CE93D8', '#FFCC80', '#90CAF9', '#F48FB1', '#E6EE9C', '#B39DDB', '#FFAB91'];

export function CategorySlider({ selectedCategory, onCategoryChange }: CategorySliderProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const index = CATEGORY_LIST.indexOf(selectedCategory);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * 90 - 150, // Center roughly
        animated: true,
      });
    }
  }, [selectedCategory]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ');

  return (
    <View className="h-32 mb-2">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
      >
        {CATEGORY_LIST.map((categoryId: string, index: number) => {
          const isSelected = selectedCategory === categoryId;
          const asset = ASSETS[categoryId];
          const bgColor = BG_COLORS[index % BG_COLORS.length];
          
          if (!asset) return null;

          return (
            <View key={categoryId} className="items-center mr-4">
              <TouchableOpacity
                onPress={() => onCategoryChange(categoryId as WordCategory)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderWidth: isSelected ? 4 : 2,
                  borderColor: isSelected ? '#FFD700' : 'white', // Gold for selected, White for others
                  backgroundColor: bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                  transform: [{ scale: isSelected ? 1.1 : 1 }],
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={asset.icon}
                  style={{ width: '70%', height: '70%' }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text 
                style={{ 
                  marginTop: 8, 
                  color: '#5D4037', 
                  fontWeight: 'bold',
                  fontSize: 14,
                  textAlign: 'center'
                }}
              >
                {capitalize(asset.name)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
