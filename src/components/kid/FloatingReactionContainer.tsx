import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FloatingReaction } from './FloatingReaction';

interface Reaction {
  id: string;
  emoji: string;
  startX?: number;
}

interface FloatingReactionContainerProps {
  children: React.ReactNode;
}

/**
 * Container for managing multiple floating reactions
 * Provides a context for triggering reactions from anywhere
 */
export const FloatingReactionContainer: React.FC<FloatingReactionContainerProps> = ({
  children,
}) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const handleReactionComplete = useCallback((id: string) => {
    setReactions((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <View style={styles.container}>
      {children}

      {/* Floating reactions layer */}
      <View style={styles.reactionsLayer} pointerEvents="none">
        {reactions.map((reaction) => (
          <FloatingReaction
            key={reaction.id}
            emoji={reaction.emoji}
            startX={reaction.startX}
            onComplete={() => handleReactionComplete(reaction.id)}
          />
        ))}
      </View>
    </View>
  );
};

// Context for triggering reactions
export const useFloatingReactions = () => {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const showReaction = useCallback((emoji: string, startX?: number) => {
    const id = `reaction-${Date.now()}-${Math.random()}`;
    setReactions((prev) => [...prev, { id, emoji, startX }]);

    // Auto-remove after animation completes
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 3500);
  }, []);

  const showMultipleReactions = useCallback((emojis: string[], delay: number = 100) => {
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
        showReaction(emoji);
      }, index * delay);
    });
  }, [showReaction]);

  return {
    reactions,
    showReaction,
    showMultipleReactions,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reactionsLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});
