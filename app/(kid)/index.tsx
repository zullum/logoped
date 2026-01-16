import React from 'react';
import { View, FlatList, Pressable, ImageBackground, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, Icon, Typography } from '@/components/ui';
import { KidHeader } from '@/components/kid';
import { useRewards } from '@/hooks/useRewards';
import { ASSETS, CATEGORY_LIST } from './activities/picture-cards/assets';

interface ActivityCard {
  id: string;
  titleKey: string;
  type: 'category' | 'game';
  categoryIcon?: ImageSourcePropType;
  gameIcon?: 'images-outline' | 'musical-notes-outline' | 'radio-button-on-outline' | 'book-outline' | 'grid-outline';
  bgColor: string;
  route: string;
  params?: Record<string, string>;
}

// Colorful background colors matching the category selector
const BG_COLORS = ['#A5D6A7', '#CE93D8', '#FFCC80', '#90CAF9', '#F48FB1', '#E6EE9C', '#B39DDB', '#FFAB91'];

// Generate category cards from ASSETS
const categoryCards: ActivityCard[] = CATEGORY_LIST.map((categoryId: string, index: number) => ({
  id: `category-${categoryId}`,
  titleKey: `kid.categories.${categoryId}`,
  type: 'category' as const,
  categoryIcon: ASSETS[categoryId].icon,
  bgColor: BG_COLORS[index % BG_COLORS.length],
  route: '/(kid)/activities/picture-cards',
  params: { category: categoryId },
}));

// Game activity cards with colorful backgrounds
const gameCards: ActivityCard[] = [
  {
    id: 'sound-matching',
    titleKey: 'kid.activities.soundMatching',
    type: 'game' as const,
    gameIcon: 'musical-notes-outline',
    bgColor: '#FFCC80', // Warm orange
    route: '/(kid)/activities/sound-matching',
  },
  {
    id: 'bubble-pop',
    titleKey: 'kid.activities.bubblePop',
    type: 'game' as const,
    gameIcon: 'radio-button-on-outline',
    bgColor: '#A5D6A7', // Light green
    route: '/(kid)/activities/bubble-pop',
  },
  {
    id: 'story-time',
    titleKey: 'kid.activities.storyTime',
    type: 'game' as const,
    gameIcon: 'book-outline',
    bgColor: '#F48FB1', // Pink
    route: '/(kid)/activities/story-time',
  },
  {
    id: 'memory-game',
    titleKey: 'kid.activities.memoryGame',
    type: 'game' as const,
    gameIcon: 'grid-outline',
    bgColor: '#B39DDB', // Purple
    route: '/(kid)/activities/memory-game',
  },
];

// Combined activities: categories first, then games
const activities: ActivityCard[] = [...categoryCards, ...gameCards];

export default function KidHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { totalStars } = useRewards();

  const renderActivityCard = ({ item }: { item: ActivityCard }) => {
    return (
      <View className="flex-1 p-2">
        <Card
          onPress={() => {
            if (item.params) {
              router.push({
                pathname: item.route as any,
                params: item.params,
              });
            } else {
              router.push(item.route as any);
            }
          }}
          className="aspect-square items-center justify-center shadow-lg"
          style={{ backgroundColor: item.bgColor }}
        >
          {item.type === 'category' ? (
            // Category card with icon image
            <View className="items-center justify-center mb-2">
              <Image
                source={item.categoryIcon}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>
          ) : (
            // Game card with white circular background + ionicon
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-2 bg-white/90"
            >
              <Icon name={item.gameIcon!} size={40} color="#5D4037" />
            </View>
          )}
          <Typography
            variant="body-lg"
            center
            numberOfLines={2}
            style={{ color: '#5D4037', fontWeight: 'bold' }}
          >
            {t(item.titleKey)}
          </Typography>
        </Card>
      </View>
    );
  };

  const ListHeader = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { totalStars } = useRewards();

    return (
      <View className="mb-lg">
        {/* Colorful Kid Header */}
        <KidHeader
          title={t('kid.home.title')}
          totalStars={totalStars || 0}
          onRewardsPress={() => router.push('/(kid)/rewards')}
        />

        {/* Sub-header */}
        <Typography
          variant="h4"
          color="dark"
          className="mt-lg mb-sm px-4"
        >
          {t('kid.home.todayChallenge')}
        </Typography>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('@assets/images/farm_background.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <FlatList
          data={activities}
          renderItem={renderActivityCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={<ListHeader />}
          contentContainerClassName="pb-lg"
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
