import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '../config';
import { useGetSkillQuery } from '../../redux/api/skillApi';
import { Skill } from '../../redux/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FadeInView } from '../components/FadeInView';
import { LoadingScreen } from '../components/LoadingScreen';
import { Svg, Path } from 'react-native-svg';
import * as SimpleIcons from 'simple-icons';

interface ScaleCardProps {
  children: React.ReactNode;
  style?: any;
}

const ScaleCard: React.FC<ScaleCardProps> = ({ children, style }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

interface SkillsScreenProps {
  isDark: boolean;
}

const SkillsScreen: React.FC<SkillsScreenProps> = ({ isDark }) => {
  const { data: skillList, isLoading, error, refetch } = useGetSkillQuery();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    if (skillList && skillList.result) {
      // Sort skills by order ascending
      const sorted = [...skillList.result].sort((a: Skill, b: Skill) => a.order - b.order);
      setSkills(sorted);
    }
  }, [skillList]);

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    subText: isDark ? '#A1A1AA' : '#6B7280',
    primary: '#F97316',
    border: isDark ? '#27272A' : '#E5E7EB',
  };

  if (isLoading) {
    return <LoadingScreen message="Loading skills" isDark={isDark} />;
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background, padding: 20 }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={50} color="red" />
        <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>
          Error: {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  if (!skillList || !skillList.result || skillList.result.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.subText} />
        <Text style={{ color: colors.subText, marginTop: 10 }}>No skills found</Text>
      </View>
    );
  }

  // Normalize icon names from web to simple-icons slugs
  const getSlug = (webIcon: string) => {
    let cleanName = webIcon.replace(/[<>/\s]/g, "");
    
    let nameWithoutPrefix = cleanName;
    const prefixes = ['Si', 'Fa', 'Ri', 'Fi', 'Bi', 'Di', 'Ai', 'Bs', 'Md', 'Tb', 'Io'];
    for (const prefix of prefixes) {
      if (cleanName.startsWith(prefix) && cleanName.length > prefix.length && cleanName[prefix.length] === cleanName[prefix.length].toUpperCase()) {
        nameWithoutPrefix = cleanName.substring(prefix.length);
        break;
      }
    }
    
    const name = nameWithoutPrefix.toLowerCase();
    
    // Normalization for simple-icons slugs
    if (name.includes('typescript') || name === 'ts') return 'typescript';
    if (name.includes('javascript') || name === 'js') return 'javascript';
    if (name.includes('react') || name.includes('native')) return 'react';
    if (name.includes('nextdotjs') || name.includes('nextjs') || name.includes('next.js')) return 'nextdotjs';
    if (name.includes('tailwindcss') || name.includes('tailwind')) return 'tailwindcss';
    if (name === 'css' || name === 'css3') return 'css';
    if (name === 'html' || name === 'html5') return 'html5';
    if (name.includes('postgresql') || name.includes('postgres')) return 'postgresql';
    if (name.includes('nodedotjs') || name.includes('nodejs') || name.includes('node')) return 'nodedotjs';
    if (name.includes('github')) return 'github';
    if (name.includes('git')) return 'git';
    if (name.includes('mongodb') || name.includes('mongo')) return 'mongodb';
    if (name.includes('amazonaws') || name.includes('aws')) return 'amazonaws';
    if (name.includes('redux')) return 'redux';
    if (name.includes('vercel')) return 'vercel';
    if (name.includes('render')) return 'render';
    if (name.includes('expo')) return 'expo';
    if (name.includes('python')) return 'python';
    if (name.includes('express')) return 'express';
    if (name.includes('docker')) return 'docker';
    
    return name;
  };

  const getFallbackIconName = (webIcon: string) => {
    const name = webIcon.toLowerCase();
    
    if (name.includes('react') || name.includes('native')) return 'react';
    if (name.includes('typescript') || name.includes('ts')) return 'language-typescript';
    if (name.includes('javascript') || name.includes('js')) return 'language-javascript';
    if (name.includes('nextdotjs') || name.includes('next.js') || name.includes('nextjs')) return 'triangle-outline';
    if (name.includes('tailwindcss') || name.includes('tailwind')) return 'tailwind';
    if (name.includes('css')) return 'language-css3';
    if (name.includes('html')) return 'language-html5';
    if (name.includes('express')) return 'server';
    if (name.includes('mongodb') || name.includes('mongo')) return 'leaf';
    if (name.includes('postgresql') || name.includes('postgres')) return 'database';
    if (name.includes('vercel')) return 'triangle';
    if (name.includes('render')) return 'cloud-upload';
    if (name.includes('expo')) return 'flash';
    if (name.includes('redux')) return 'infinity';
    if (name.includes('git') || name.includes('github')) return 'git';
    if (name.includes('python')) return 'language-python';
    if (name.includes('node')) return 'nodejs';
    if (name.includes('docker')) return 'docker';
    
    return 'code-tags';
  };

  // Svg-based Icon component for rendering brand logos perfectly
  const SkillIcon: React.FC<{ iconName: string; size: number; color: string }> = ({
    iconName,
    size,
    color,
  }) => {
    const slug = getSlug(iconName);
    const exportName = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
    let brandIcon = (SimpleIcons as any)[exportName];

    if (!brandIcon) {
      const lowercaseExportName = exportName.toLowerCase();
      const foundKey = Object.keys(SimpleIcons).find(
        (key) => key.toLowerCase() === lowercaseExportName || key.toLowerCase().includes(slug)
      );
      if (foundKey) {
        brandIcon = (SimpleIcons as any)[foundKey];
      }
    }

    if (brandIcon && brandIcon.path) {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d={brandIcon.path} fill={color} />
        </Svg>
      );
    }

    // MaterialCommunityIcons fallback
    const fallbackIconName = getFallbackIconName(iconName);
    return (
      <MaterialCommunityIcons
        name={fallbackIconName as any}
        size={size}
        color={color}
      />
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.gridContainer}>
        {skills.map((skill, index) => (
          <FadeInView
            key={skill._id}
            delay={index * 40}
            duration={400}
          >
            <ScaleCard
              style={[
                styles.skillGridCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDark ? 'rgba(249, 115, 22, 0.25)' : 'rgba(249, 115, 22, 0.15)',
                }
              ]}
            >
              <LinearGradient
                colors={['#F97316', '#EA580C']}
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <SkillIcon
                  iconName={skill.icon || skill.skillName}
                  size={24}
                  color="#FFFFFF"
                />
              </LinearGradient>
              <Text style={[styles.skillCardName, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                {skill.skillName}
              </Text>
            </ScaleCard>
          </FadeInView>
        ))}
      </View>
    </ScrollView>
  );
};

export default SkillsScreen;

const { width: screenWidth } = Dimensions.get('window');

// Dynamic column calculation for maximum responsiveness across devices and orientations
const getNumColumns = (w: number) => {
  if (w >= 768) return 4; // Tablets
  if (w >= 480) return 3; // Phablets / Landscape phones
  return 2; // Portrait Phones
};

const numColumns = getNumColumns(screenWidth);
const cardWidth = (screenWidth - 32 - (14 * (numColumns - 1))) / numColumns;
const cardHeight = cardWidth / 1.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14, // Row and Column gaps are uniform
  },
  skillGridCard: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1.5,
      },
      default: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
      },
    }),
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  skillCardName: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
