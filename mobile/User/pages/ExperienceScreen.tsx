import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGetExperienceQuery } from '../../redux/api/experienceApi';
import { FadeInView } from '../components/FadeInView';
import { LoadingScreen } from '../components/LoadingScreen';
import { Experience } from '../../redux/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ScaleCardProps {
  children: React.ReactNode;
  style?: any;
}

const ScaleCard: React.FC<ScaleCardProps> = ({ children, style }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
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

interface ExperienceScreenProps {
  isDark: boolean;
}

const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ isDark }) => {
  const { data: expList, isLoading, error, refetch } = useGetExperienceQuery();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    if (expList && expList.result) {
      // Sort by order ascending
      const sorted = [...expList.result].sort((a: Experience, b: Experience) => a.order - b.order);
      setExperiences(sorted);
    }
  }, [expList]);

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    subText: isDark ? '#A1A1AA' : '#6B7280',
    primary: '#F97316',
    border: isDark ? '#27272A' : '#E5E7EB',
    timelineLine: isDark ? '#27272A' : '#E5E7EB',
  };

  if (isLoading) {
    return <LoadingScreen message="Loading experience" isDark={isDark} />;
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
      {experiences.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="briefcase-off" size={48} color={colors.subText} />
          <Text style={[styles.emptyText, { color: colors.subText }]}>No experiences found</Text>
        </View>
      ) : (
        <View style={styles.timelineContainer}>
          {/* Vertical Line */}
          <View style={[styles.timelineLine, { backgroundColor: colors.timelineLine }]} />

          {experiences.map((exp, index) => (
            <FadeInView key={exp._id} delay={index * 80} duration={450} style={styles.timelineItem}>
              {/* Dot indicator */}
              <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />

              {/* Card wrapper */}
              <ScaleCard style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {/* Year Badge */}
                <View style={styles.yearBadge}>
                  <LinearGradient
                    colors={['#F97316', '#EA580C']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <Text style={styles.yearText}>
                    {exp.period}
                  </Text>
                </View>

                <Text style={[styles.role, { color: colors.text }]}>{exp.role}</Text>
                <Text style={[styles.company, { color: colors.primary }]}>{exp.company}</Text>

                <Text style={[styles.desc, { color: colors.subText }]}>{exp.description}</Text>
              </ScaleCard>
            </FadeInView>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ExperienceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 20,
  },
  timelineLine: {
    position: 'absolute',
    left: 4,
    top: 12,
    bottom: 12,
    width: 2,
    borderRadius: 1,
  },
  timelineItem: {
    position: 'relative',
    marginBottom: 20,
  },
  timelineDot: {
    position: 'absolute',
    left: -20,
    top: 14,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  yearBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  yearText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
