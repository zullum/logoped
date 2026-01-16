import React, { useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';

interface ImageSliderProps {
  items: { id: string; image: any }[];
  currentIndex: number;
  onSelectWord: (index: number) => void;
  onNextCategory?: () => void;
}

const BG_COLORS = ['#A5D6A7', '#CE93D8', '#FFCC80', '#90CAF9', '#F48FB1', '#E6EE9C', '#B39DDB', '#FFAB91'];

export function ImageSlider({ 
  items, 
  currentIndex, 
  onSelectWord, 
  onNextCategory,
}: ImageSliderProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to keep the selected item in view
  useEffect(() => {
    if (scrollViewRef.current) {
      const x = Math.max(0, currentIndex * 90 - 150); // Ensure non-negative and center
      scrollViewRef.current.scrollTo({
        x: x,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <View className="h-28 mt-4">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
      >
        {items.map((item, index) => {
          const isSelected = index === currentIndex;
          const bgColor = BG_COLORS[index % BG_COLORS.length];
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelectWord(index)}
              style={{
                width: 80,
                height: 80,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: bgColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isSelected ? 4 : 0,
                borderColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4,
                transform: [{ scale: isSelected ? 1.1 : 1 }],
              }}
              activeOpacity={0.7}
            >
              <Image
                source={item.image}
                style={{ width: '80%', height: '80%' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
        
        {/* Next Category Button */}
        {onNextCategory && (
          <TouchableOpacity
            onPress={onNextCategory}
            style={{
              width: 80,
              height: 80,
              marginRight: 10,
              borderRadius: 20,
              backgroundColor: '#4A90E2',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.9,
            }}
            activeOpacity={0.7}
          >
            {/* Simple arrow text for now, or use an icon if available */}
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' }}>
               <Image source={require('@assets/images/buttons/back_button.webp')} style={{ width: 30, height: 30, transform: [{rotate: '180deg'}] }} resizeMode="contain" />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
