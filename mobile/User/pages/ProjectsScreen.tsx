import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  TextInput,
  Platform,
  RefreshControl,
  Animated,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Keyboard,
} from 'react-native';
import { useGetProjectQuery } from '../../redux/api/projectApi';
import { LinearGradient } from 'expo-linear-gradient';
import { FadeInView } from '../components/FadeInView';
import { LoadingScreen } from '../components/LoadingScreen';
import { Project } from '../../redux/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

interface ProjectsScreenProps {
  isDark: boolean;
}

const getCategoryDisplayName = (category: string) => {
  if (!category) return '';
  const lowerCat = category.toLowerCase().trim();
  if (lowerCat === 'all') return 'All Project';
  if (lowerCat === 'web') return 'Web Site';
  if (lowerCat === 'apps devlopar' || lowerCat === 'apps development' || lowerCat === 'apps devlopment') {
    return 'Mobile apps';
  }
  return category;
};

interface ScaleButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScaleButton: React.FC<ScaleButtonProps> = ({ onPress, children, style }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ isDark }) => {
  const { data: projectList, isLoading, error, refetch } = useGetProjectQuery();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      Keyboard.dismiss();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  useEffect(() => {
    if (projectList && projectList.result) {
      setProjects(projectList.result);
      setFilteredProjects(projectList.result);

      // Extract unique categories
      const cats = ['All', ...new Set(projectList.result.map((p) => p.category).filter(Boolean) as string[])];
      setCategories(cats);
    }
  }, [projectList]);

  const filterProjects = (category: string, query: string) => {
    let temp = [...projects];

    if (category !== 'All') {
      temp = temp.filter((p) => p.category === category);
    }

    if (query) {
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProjects(temp);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterProjects(category, search);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    filterProjects(selectedCategory, text);
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    subText: isDark ? '#A1A1AA' : '#6B7280',
    primary: '#F97316',
    border: isDark ? '#27272A' : '#E5E7EB',
    inputBg: isDark ? '#1C1C1E' : '#FFFFFF',
  };

  const renderProjectItem = ({ item, index }: { item: Project; index: number }) => {
    const rawData = Array.isArray(item.technologies)
      ? item.technologies
      : (item.technologies ? [item.technologies] : []);

    const techList = rawData
      .flatMap((t: any) => (typeof t === 'string' ? t.split(/[,\r\n]+/) : t))
      .map((t: string) => t.trim())
      .filter((t: string) => t !== "" && t !== "undefined");

    return (
      <FadeInView delay={index * 80} duration={450}>
        <View style={[styles.projectCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.projectImage} resizeMode="cover" />
          )}
          <View style={styles.cardContent}>
            <View style={styles.headerRow}>
              <Text style={[styles.projectTitle, { color: colors.text }]}>{item.title}</Text>
              {/* {item.category && (
                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '15' }]}>
                  <Text style={[styles.categoryText, { color: colors.primary }]}>
                    {getCategoryDisplayName(item.category)}
                  </Text>
                </View>
              )} */}
            </View>

            <Text style={[styles.projectDesc, { color: colors.subText }]}>
              {item.description ? item.description.replace(/[\r\n]+/g, ' ') : ''}
            </Text>

            {/* Tech Badges */}
            <View style={styles.techContainer}>
              {techList.map((tech: string, idx: number) => (
                <View key={idx} style={[styles.techBadge, { backgroundColor: isDark ? '#27272A' : '#F3F4F6' }]}>
                  <Text style={[styles.techText, { color: colors.text }]}>{tech}</Text>
                </View>
              ))}
            </View>

            {/* Action Links */}
            <View style={styles.actionRow}>
              {item.githubUrl && (
                <ScaleButton
                  style={[styles.actionBtn, { borderColor: colors.border }]}
                  onPress={() => openUrl(item.githubUrl!)}
                >
                  <MaterialCommunityIcons name="github" size={16} color={colors.text} />
                  <Text style={[styles.actionBtnText, { color: colors.text }]}>Code</Text>
                </ScaleButton>
              )}
              {item.liveUrl && (
                <ScaleButton
                  style={[styles.actionBtn, { backgroundColor: 'transparent', borderWidth: 0 }]}
                  onPress={() => openUrl(item.liveUrl!)}
                >
                  <LinearGradient
                    colors={['#F97316', '#EA580C']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                  <MaterialCommunityIcons name="open-in-new" size={16} color="#FFFFFF" />
                  <Text style={styles.actionBtnTextPrimary}>Live Demo</Text>
                </ScaleButton>
              )}
            </View>
          </View>
        </View>
      </FadeInView>
    );
  };

  if (isLoading) {
    return <LoadingScreen message="Loading projects" isDark={isDark} />;
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

  if (!projectList || !projectList.result || projectList.result.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <MaterialCommunityIcons name="alert-circle-outline" size={50} color={colors.subText} />
        <Text style={{ color: colors.subText, marginTop: 10 }}>No projects found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Input */}
      <View style={[styles.searchBox, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.subText} style={styles.searchIcon} />
        <TextInput
          placeholder="Search projects..."
          placeholderTextColor={colors.subText}
          value={search}
          onChangeText={handleSearchChange}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      {/* Categories Tabs list */}
      <View style={styles.tabContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tabListContent}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <ScaleButton
                onPress={() => handleCategorySelect(item)}
                style={[
                  styles.tabButton,
                  {
                    borderColor: isSelected ? 'transparent' : colors.border,
                    backgroundColor: isSelected ? 'transparent' : (isDark ? '#1C1C1E' : '#FFFFFF'),
                  },
                ]}
              >
                {isSelected && (
                  <LinearGradient
                    colors={['#F97316', '#EA580C']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                )}
                <Text
                  style={[
                    styles.tabButtonText,
                    { color: isSelected ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {getCategoryDisplayName(item)}
                </Text>
              </ScaleButton>
            );
          }}
        />
      </View>

      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => renderProjectItem({ item, index })}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="folder-open" size={48} color={colors.subText} />
            <Text style={[styles.emptyText, { color: colors.subText }]}>No projects found</Text>
          </View>
        }
      />
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  tabContainer: {
    marginBottom: 8,
  },
  tabListContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  projectCard: {
    borderRadius: 16,
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
  projectImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  projectDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  techBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  techText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreTechText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    borderRadius: 15,
    borderWidth: 1,
    gap: 6,
    overflow: 'hidden',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionBtnTextPrimary: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
