import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { StickerCard } from '@/components/kid/StickerCard';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { useRewards } from '@/hooks/useRewards';
import { useTranslation } from '@/hooks/useTranslation';
import type { Sticker, Achievement } from '@/types/reward.types';

type TabType = 'stickers' | 'achievements';

export default function RewardsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    totalStars,
    currentStreak,
    getAllStickers,
    getAllAchievements,
  } = useRewards();

  const [activeTab, setActiveTab] = useState<TabType>('stickers');
  const [selectedItem, setSelectedItem] = useState<Sticker | Achievement | null>(null);

  const stickers = getAllStickers();
  const achievements = getAllAchievements();

  const unlockedStickers = stickers.filter((s) => s.isUnlocked).length;
  const unlockedAchievements = achievements.filter((a) => a.isUnlocked).length;

  const handleBack = () => {
    router.back();
  };

  const renderStickerItem = ({ item }: { item: Sticker }) => (
    <View style={{ width: '33.33%', padding: 8 }}>
      <StickerCard
        sticker={item}
        size="small"
        onPress={() => item.isUnlocked && setSelectedItem(item)}
      />
    </View>
  );

  const renderAchievementItem = ({ item }: { item: Achievement }) => (
    <Pressable
      onPress={() => item.isUnlocked && setSelectedItem(item)}
      disabled={!item.isUnlocked}
      className={`mx-4 mb-4 p-4 rounded-2xl flex-row items-center ${
        item.isUnlocked ? 'bg-white' : 'bg-gray-100'
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Icon */}
      <View
        className={`w-16 h-16 rounded-full items-center justify-center ${
          item.isUnlocked ? 'bg-coral-500' : 'bg-gray-300'
        }`}
      >
        <Icon
          name={item.isUnlocked ? (item.iconName as any) : 'lock-closed'}
          size={32}
          color="white"
        />
      </View>

      {/* Details */}
      <View className="flex-1 ml-4">
        <Text
          className={`text-lg font-quicksand-bold ${
            item.isUnlocked ? 'text-text-dark' : 'text-gray-400'
          }`}
          style={{ fontFamily: 'Quicksand_700Bold' }}
        >
          {item.title}
        </Text>
        <Text
          className={`text-sm font-nunito-regular ${
            item.isUnlocked ? 'text-text-medium' : 'text-gray-400'
          }`}
          style={{ fontFamily: 'Nunito_400Regular' }}
        >
          {item.isUnlocked ? item.description : 'Locked'}
        </Text>
      </View>

      {/* Stars */}
      {item.isUnlocked && (
        <View className="flex-row items-center bg-sunshine-50 px-3 py-2 rounded-full">
          <Icon name="star" size={16} color="#FFD166" />
          <Text
            className="text-sm font-quicksand-bold text-sunshine-600 ml-1"
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            {item.rewardStars}
          </Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Pressable
          onPress={handleBack}
          className="w-12 h-12 items-center justify-center rounded-full bg-gray-100"
        >
          <Icon name="arrow-back" size={24} color="#2D3748" />
        </Pressable>

        <Text
          className="text-2xl font-quicksand-bold text-text-dark"
          style={{ fontFamily: 'Quicksand_700Bold' }}
        >
          {t('kid.rewards.title')}
        </Text>

        <StarDisplay count={totalStars} />
      </View>

      {/* Stats Bar */}
      <View className="flex-row bg-white px-6 py-4 justify-around border-b border-gray-200">
        <View className="items-center">
          <View className="flex-row items-center mb-1">
            <Icon name="images" size={20} color="#4A90E2" />
            <Text
              className="text-2xl font-quicksand-bold text-primary-500 ml-2"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {unlockedStickers}/{stickers.length}
            </Text>
          </View>
          <Text
            className="text-sm font-nunito-regular text-text-light"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            {t('kid.rewards.stickersStat')}
          </Text>
        </View>

        <View className="items-center">
          <View className="flex-row items-center mb-1">
            <Icon name="trophy" size={20} color="#EF476F" />
            <Text
              className="text-2xl font-quicksand-bold text-coral-500 ml-2"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {unlockedAchievements}/{achievements.length}
            </Text>
          </View>
          <Text
            className="text-sm font-nunito-regular text-text-light"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            {t('kid.rewards.achievementsStat')}
          </Text>
        </View>

        <View className="items-center">
          <View className="flex-row items-center mb-1">
            <Icon name="flame" size={20} color="#FFD166" />
            <Text
              className="text-2xl font-quicksand-bold text-sunshine-600 ml-2"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {currentStreak}
            </Text>
          </View>
          <Text
            className="text-sm font-nunito-regular text-text-light"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            {t('kid.rewards.streakStat')}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white px-6 py-3">
        <Pressable
          onPress={() => setActiveTab('stickers')}
          className={`flex-1 py-3 rounded-xl mr-2 items-center ${
            activeTab === 'stickers' ? 'bg-primary-500' : 'bg-gray-100'
          }`}
        >
          <Text
            className={`text-lg font-quicksand-semibold ${
              activeTab === 'stickers' ? 'text-white' : 'text-gray-600'
            }`}
            style={{ fontFamily: 'Quicksand_600SemiBold' }}
          >
            {t('kid.rewards.stickersTab')}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('achievements')}
          className={`flex-1 py-3 rounded-xl ml-2 items-center ${
            activeTab === 'achievements' ? 'bg-primary-500' : 'bg-gray-100'
          }`}
        >
          <Text
            className={`text-lg font-quicksand-semibold ${
              activeTab === 'achievements' ? 'text-white' : 'text-gray-600'
            }`}
            style={{ fontFamily: 'Quicksand_600SemiBold' }}
          >
            {t('kid.rewards.achievementsTab')}
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 pt-4">
        {activeTab === 'stickers' ? (
          <FlatList
            key="stickers-list"
            data={stickers}
            renderItem={renderStickerItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        ) : (
          <FlatList
            key="achievements-list"
            data={achievements}
            renderItem={renderAchievementItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 8 }}
          />
        )}
      </ScrollView>

      {/* Detail Modal (optional enhancement) */}
      {/* Could add a modal here to show detailed info about selected sticker/achievement */}
    </SafeAreaView>
  );
}
