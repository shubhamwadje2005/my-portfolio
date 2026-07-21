import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, View, Image, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import Screens
import HomeScreen from '../pages/HomeScreen';
import ProjectsScreen from '../pages/ProjectsScreen';
import SkillsScreen from '../pages/SkillsScreen';
import ExperienceScreen from '../pages/ExperienceScreen';
import EducationScreen from '../pages/EducationScreen';

const Tab = createBottomTabNavigator();

interface AppNavigatorProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ isDark, onToggleTheme }) => {
  const insets = useSafeAreaInsets();
  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    subText: isDark ? '#A1A1AA' : '#6B7280',
    primary: '#F97316', // Orange
    border: isDark ? '#27272A' : '#E5E7EB',
  };

  const themeConfig = isDark ? DarkTheme : DefaultTheme;

  const headerLeftLogo = () => (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/shubham.png')}
        style={[
          styles.logoImage,
          Platform.select({
            web: {
              filter: isDark ? 'none' : 'invert(1)',
            } as any,
            default: {},
          }),
        ]}
        resizeMode="contain"
      />
    </View>
  );

  const headerRightButton = () => (
    <TouchableOpacity onPress={onToggleTheme} style={styles.themeToggle}>
      <MaterialCommunityIcons
        name={isDark ? 'weather-sunny' : 'weather-night'}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer theme={themeConfig}>
      <Tab.Navigator
        screenOptions={{
          animation: 'fade',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subText,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            height: Platform.OS === 'web' ? 65 : 64 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            paddingTop: 8,
          },
          headerBackground: () => (
            <LinearGradient
              colors={isDark ? ['#1C1C1E', '#0A0A0A'] : ['#FFFFFF', '#F8F9FA']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          ),
          headerStyle: {
            backgroundColor: 'transparent',
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            ...Platform.select({
              ios: { shadowOpacity: 0 },
              android: { elevation: 0 },
              default: { boxShadow: 'none' },
            }),
          },
          headerLeft: headerLeftLogo,
          headerTitle: '',
          headerRight: headerRightButton,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            title: 'Shubham Wadje',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-variant" color={color} size={size + 2} />
            ),
          }}
        >
          {() => <HomeScreen isDark={isDark} />}
        </Tab.Screen>

        <Tab.Screen
          name="Projects"
          options={{
            title: 'Projects',
            tabBarLabel: 'Projects',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="folder-multiple" color={color} size={size} />
            ),
          }}
        >
          {() => <ProjectsScreen isDark={isDark} />}
        </Tab.Screen>

        <Tab.Screen
          name="Skills"
          options={{
            title: 'Skills & Tech',
            tabBarLabel: 'Skills',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="lightbulb-on" color={color} size={size} />
            ),
          }}
        >
          {() => <SkillsScreen isDark={isDark} />}
        </Tab.Screen>

        <Tab.Screen
          name="Experience"
          options={{
            title: 'Experience',
            tabBarLabel: 'Experience',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="briefcase" color={color} size={size} />
            ),
          }}
        >
          {() => <ExperienceScreen isDark={isDark} />}
        </Tab.Screen>

        <Tab.Screen
          name="Education"
          options={{
            title: 'Education',
            tabBarLabel: 'Education',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="school" color={color} size={size} />
            ),
          }}
        >
          {() => <EducationScreen isDark={isDark} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  themeToggle: {
    marginRight: 16,
    padding: 4,
  },
  logoContainer: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 24,
    width: 80,
  },
});
