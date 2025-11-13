import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { CharacterAvatar, StarDisplay } from '@/components/kid';
import { useMMKVNumberState, STORAGE_KEYS } from '@/lib/storage';

interface Activity {
  id: string;
  titleKey: string;
  icon: 'images-outline' | 'musical-notes-outline' | 'radio-button-on-outline' | 'book-outline';
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
];

export default function KidHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [totalStars] = useMMKVNumberState(STORAGE_KEYS.TOTAL_STARS);

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" contentContainerClassName="p-lg">
        {/* Header with Avatar and Stars */}
        <View className="flex-row justify-between items-center mb-xl">
          <View>
            <Text
              className="text-3xl text-text-dark"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {t('kid.home.title')}
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <StarDisplay count={totalStars || 0} />
            <CharacterAvatar size={60} />
          </View>
        </View>

        {/* Activities Grid */}
        <View className="gap-md">
          <Text
            className="text-xl text-text-dark mb-sm"
            style={{ fontFamily: 'Quicksand_600SemiBold' }}
          >
            {t('kid.home.todayChallenge')}
          </Text>

          <View className="flex-row flex-wrap gap-md">
            {activities.map((activity) => (
              <View key={activity.id} className="w-[48%]">
                <Card
                  onPress={() => router.push(activity.route as any)}
                  className="aspect-square items-center justify-center"
                  padding="medium"
                >
                  <View
                    className={`
                      ${activity.color}
                      w-20 h-20
                      rounded-full
                      items-center
                      justify-center
                      mb-md
                    `}
                  >
                    <Icon
                      name={activity.icon}
                      size={40}
                      color="white"
                    />
                  </View>
                  <Text
                    className="text-lg text-text-dark text-center"
                    style={{ fontFamily: 'Quicksand_600SemiBold' }}
                  >
                    {t(activity.titleKey)}
                  </Text>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
