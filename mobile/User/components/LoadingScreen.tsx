import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';

interface LoadingScreenProps {
  message?: string;
  isDark: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading',
  isDark,
}) => {
  const [dots, setDots] = useState('');
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  // Dots animation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  // Pulsing animation for loading text
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    primary: '#F97316',
    subText: isDark ? '#A1A1AA' : '#6B7280',
  };

  return (
    <View style={[styles.center, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <View style={styles.row}>
        <Animated.Text
          style={[
            styles.loadingText,
            {
              color: colors.subText,
              opacity: pulseAnim,
            },
          ]}
        >
          {message}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.loadingText,
            {
              color: colors.subText,
              opacity: pulseAnim,
              width: 24, // Fixed width prevents centering alignment shift
            },
          ]}
        >
          {dots}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
