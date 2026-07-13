import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import { useGetAboutQuery } from '../../redux/api/aboutApi';
import { AboutData } from '../../redux/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FadeInView } from '../components/FadeInView';
import { LoadingScreen } from '../components/LoadingScreen';
import { LinearGradient } from 'expo-linear-gradient';

interface HomeScreenProps {
  isDark: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isDark }) => {
  const { data: aboutResponse, isLoading, error, refetch } = useGetAboutQuery();
  const data = aboutResponse?.result || null;

  const [refreshing, setRefreshing] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const spinValue = React.useRef(new Animated.Value(0)).current;
  const spinRotation = React.useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    let pulse: Animated.CompositeAnimation | null = null;
    if (!isDownloading) {
      pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => {
      if (pulse) pulse.stop();
    };
  }, [pulseAnim, isDownloading]);

  const handlePress = () => {
    if (isDownloading) return;

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1.05,
        friction: 3,
        tension: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      })
    ]).start();

    setIsDownloading(true);
    spinValue.setValue(0);
    spinRotation.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinRotation.current.start();

    setTimeout(() => {
      openUrl("https://my-portfolio-one-peach-72.vercel.app/Shubham_Wadje_Resume.pdf");
      if (spinRotation.current) {
        spinRotation.current.stop();
      }
      setIsDownloading(false);
    }, 1600);
  };

  const handlePressIn = () => {
    if (isDownloading) return;
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  const handlePressOut = () => {
    if (isDownloading) return;
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    subText: isDark ? '#A1A1AA' : '#6B7280',
    primary: '#F97316', // Orange Accent
    border: isDark ? '#27272A' : '#E5E7EB',
  };

  if (isLoading) {
    return <LoadingScreen message="Loading profile" isDark={isDark} />;
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

  if (!data) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.subText} />
        <Text style={{ color: colors.subText, marginTop: 10 }}>No biography details found</Text>
      </View>
    );
  }

  const personalInfo = data.personal?.[0];

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
      {/* Hero Section */}
      <FadeInView delay={100} duration={500}>
        <LinearGradient
          colors={isDark ? ['#1C1C1E', '#0A0A0A'] : ['#FFFFFF', '#F3F4F6']}
          style={[styles.heroCard, { borderColor: colors.border }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {data?.profileImage ? (
            <Image source={{ uri: data.profileImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.border }]}>
              <MaterialCommunityIcons name="account" size={60} color={colors.subText} />
            </View>
          )}
          <Text style={[styles.name, { color: colors.text }]}>{data?.name || "Shubham Wadje"}</Text>
          <Text style={[styles.title, { color: colors.primary }]}>{data?.title || "Full Stack Developer"}</Text>
          <Text style={[styles.description, { color: colors.subText }]}>
            {data?.introduction || "MERN Stack Developer with a passion for creating beautiful, responsive applications."}
          </Text>

          {/* Social Icons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: isDark ? '#27272A' : '#F3F4F6' }]}
              onPress={() => openUrl("https://github.com/shubhamwadje2005")}
            >
              <MaterialCommunityIcons name="github" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: isDark ? '#27272A' : '#F3F4F6' }]}
              onPress={() => openUrl("https://www.linkedin.com/in/shubham-wadje-916a31317")}
            >
              <MaterialCommunityIcons name="linkedin" size={22} color={colors.primary} />
            </TouchableOpacity>
            {personalInfo?.email && (
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: isDark ? '#27272A' : '#F3F4F6' }]}
                onPress={() => openUrl(`mailto:${personalInfo.email}`)}
              >
                <MaterialCommunityIcons name="email" size={22} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>

          {/* Download Resume Button with tap scale and pulse animation */}
          <TouchableWithoutFeedback
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={[
                styles.resumeButton,
                {
                  transform: [
                    { scale: isDownloading ? scaleValue : Animated.multiply(scaleValue, pulseAnim) }
                  ]
                }
              ]}
            >
              <LinearGradient
                colors={isDownloading ? ['#16A34A', '#15803D'] : ['#F97316', '#EA580C']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
              {isDownloading ? (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <MaterialCommunityIcons name="loading" size={22} color="#FFFFFF" />
                </Animated.View>
              ) : (
                <MaterialCommunityIcons name="file-download-outline" size={22} color="#FFFFFF" />
              )}
              <Text style={styles.resumeButtonText}>
                {isDownloading ? "Downloading..." : "Download Resume"}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </FadeInView>

      {/* Personal Info Grid */}
      <FadeInView delay={250} duration={500}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Contact & Info</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Location</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{personalInfo?.location || "Maharashtra, India"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Email</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{personalInfo?.email || "shubhamwadje2005@gmail.com"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="phone" size={20} color={colors.primary} style={styles.infoIcon} />
            <View>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Phone</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>+91 {personalInfo?.phone || "9028725948"}</Text>
            </View>
          </View>
        </View>
      </FadeInView>
    </ScrollView>
  );
};

export default HomeScreen;

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
  heroCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    marginTop: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      default: {
        boxShadow: '0px 4px 6px rgba(249, 115, 22, 0.2)',
      },
    }),
  },
  resumeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});
