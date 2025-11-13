import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, Icon } from '@/components/ui';
import { CharacterAvatar, StarDisplay } from '@/components/kid';
import { useRewards } from '@/hooks/useRewards';

interface Activity {
  id: string;
  titleKey: string;
  icon: 'images-outline' | 'musical-notes-outline' | 'radio-button-on-outline' | 'book-outline' | 'grid-outline';
  color: string;
  route: string;
}

const activities: Activity[] = [
  {
    id: 'picture-cards',
    titleKey: 'kid.activities.pictureCards',
    icon: 'images-outline',
    color: 'bg-primary-500',
    route: '/(kid)/activities/picture-cards',
  },
  {
    id: 'sound-matching',
    titleKey: 'kid.activities.soundMatching',
    icon: 'musical-notes-outline',
    color: 'bg-sunshine-500',
    route: '/(kid)/activities/sound-matching',
  },
  {
    id: 'bubble-pop',
    titleKey: 'kid.activities.bubblePop',
    icon: 'radio-button-on-outline',
    color: 'bg-grass-500',
    route: '/(kid)/activities/bubble-pop',
  },
  {
    id: 'story-time',
    titleKey: 'kid.activities.storyTime',
    icon: 'book-outline',
    color: 'bg-coral-500',
    route: '/(kid)/activities/story-time',
  },
  {
    id: 'memory-game',
    titleKey: 'kid.activities.memoryGame',
    icon: 'grid-outline',
    color: 'bg-lavender-500',
    route: '/(kid)/activities/memory-game',
  },
];

export default function KidHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { totalStars } = useRewards();

  const renderActivityCard = ({ item }: { item: Activity }) => {
    return (
      <View className="flex-1 p-2">
        <Card
          onPress={() => router.push(item.route as any)}
          className="aspect-square items-center justify-center"
        >
          <View
            className={`
              ${item.color}
              w-20 h-20
              rounded-full
              items-center
              justify-center
              mb-md
            `}
          >
            <Icon name={item.icon} size={40} color="white" />
          </View>
          <Text
            className="text-lg text-text-dark text-center"
            style={{ fontFamily: 'Quicksand_600SemiBold' }}
          >
            {t(item.titleKey)}
          </Text>
        </Card>
      </View>
    );
  };

  const ListHeader = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { totalStars } = useRewards();

    return (
      <View className="px-4 pt-4 mb-lg">
        {/* Header with Avatar and Stars */}
        <View className="flex-col">
          <Text
            className="text-3xl text-text-dark mb-2"
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            {t('kid.home.title')}
          </Text>
          <View className="flex-row items-center justify-end gap-2">
            <Pressable onPress={() => router.push('/(kid)/rewards')}>
              <Card className="p-2">
                <Icon name="ribbon-outline" size={28} color="#4A90E2" />
              </Card>
            </Pressable>
            <StarDisplay count={totalStars || 0} />
            <CharacterAvatar size={50} />
          </View>
        </View>

        {/* Sub-header */}
        <Text
          className="text-xl text-text-dark mt-lg mb-sm"
          style={{ fontFamily: 'Quicksand_600SemiBold' }}
        >
          {t('kid.home.todayChallenge')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top', 'left', 'right']}>
      <FlatList
        data={activities}
        renderItem={renderActivityCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}
        contentContainerClassName="pb-lg"
      />
    </SafeAreaView>
  );
}
