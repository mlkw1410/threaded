import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  PanResponder,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import React Navigation components
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your new screen (assuming it's in the same folder as App.tsx)
import ClosetScreen from './ClosetScreen'; // <--- IMPORTANT: Changed from './src/screens/ClosetScreen'

const { width: screenWidth } = Dimensions.get('window');
import type { ColorValue } from 'react-native';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gradient: [ColorValue, ColorValue, ...ColorValue[]];
  onPress?: () => void;
}

const carouselData: CarouselItem[] = [
  {
    id: '1',
    title: 'Add Item',
    subtitle: 'Add new clothes to your closet',
    image: '+',
    gradient: ['#E8E3E1', '#D5CFC9'], // Warm dusty rose neutral
  },
  {
    id: '2',
    title: 'View Closet',
    subtitle: 'Browse your wardrobe',
    image: '👗',
    gradient: ['#E1E6E4', '#CED3D0'], // Cool sage neutral
  },
  {
    id: '3',
    title: 'Choose Your Mood',
    subtitle: 'Find outfits that match your vibe',
    image: '😊',
    gradient: ['#E6E4E1', '#D3CFC9'], // Soft mushroom neutral
  },
];

const Carousel: React.FC<{ data: CarouselItem[] }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  React.useEffect(() => {
    carouselData[1].onPress = () => navigation.navigate('Closet' as never);
    // You'd add other onPress functions here as you build those screens
    // carouselData[0].onPress = () => navigation.navigate('AddItem' as never);
  }, [navigation]);

  const getNextIndex = (index: number) => (index + 1) % data.length;
  const getPreviousIndex = (index: number) => (index - 1 + data.length) % data.length;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderGrant: () => {
      translateX.extractOffset();
    },
    onPanResponderMove: (evt, gestureState) => {
      const resistance = 0.8;
      translateX.setValue(gestureState.dx * resistance);
    },
    onPanResponderRelease: (evt, gestureState) => {
      translateX.flattenOffset();

      const threshold = screenWidth * 0.25;
      const velocity = Math.abs(gestureState.vx);

      if (gestureState.dx > threshold || (gestureState.dx > 40 && velocity > 0.2)) {
        setCurrentIndex(getPreviousIndex(currentIndex));
      } else if (gestureState.dx < -threshold || (gestureState.dx < -40 && velocity > 0.2)) {
        setCurrentIndex(getNextIndex(currentIndex));
      }

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
        overshootClamping: false,
      }).start();
    },
  });

  const animatedStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: [-screenWidth, 0, screenWidth],
          outputRange: [-100, 0, 100],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.carouselContainer}>
      <Animated.View
        style={[styles.stackedCarousel, animatedStyle]}
        {...panResponder.panHandlers}
      >
        {data.map((item, index) => {
          const isActive = index === currentIndex;
          const isNext = index === getNextIndex(currentIndex);
          const isPrevious = index === getPreviousIndex(currentIndex);

          if (!isActive && !isNext && !isPrevious) {
            return null;
          }

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.stackedCard,
                isActive && styles.activeCard,
                isNext && styles.nextCard,
                isPrevious && styles.previousCard,
              ]}
              onPress={() => {
                if (isActive && item.onPress) {
                  item.onPress();
                }
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={item.gradient}
                style={styles.gradientBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.itemEmoji}>{item.image}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: currentIndex === index ? '#5A5856' : '#C4C2BF' }
            ]}
            onPress={() => setCurrentIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};


const Stack = createNativeStackNavigator();

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F7F5" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Threaded</Text>
        <Text style={styles.headerSubtitle}>Your Digital Closet</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Carousel data={carouselData} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionEmoji}>🌙</Text>
                <Text style={styles.actionTitle}>Date Night</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionEmoji}>💼</Text>
                <Text style={styles.actionTitle}>Office</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionEmoji}>🥐</Text>
                <Text style={styles.actionTitle}>Weekend Brunch</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>Added new shirt to closet</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>Created "Summer Vibes" outfit</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>Shared outfit with friends</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Closet"
          component={ClosetScreen}
          options={{
            headerTitle: 'Your Closet',
            headerStyle: {
              backgroundColor: '#F8F7F5',
            },
            headerTintColor: '#4A4845',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // Removed invalid property 'headerBackTitleVisible'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#F8F7F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E5E1',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4845',
    marginBottom: 2,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7A7672',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4845',
    marginBottom: 15,
  },
  carouselContainer: {
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  stackedCarousel: {
    height: 200,
    width: screenWidth * 0.9,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackedCard: {
    position: 'absolute',
    width: screenWidth * 0.75,
    height: (screenWidth * 0.75) * (468 / 461),
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activeCard: {
    zIndex: 4,
    transform: [{ scale: 1 }],
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  nextCard: {
    zIndex: 3,
    transform: [{ scale: 0.92 }, { translateX: 20 }],
  },
  previousCard: {
    zIndex: 3,
    transform: [{ scale: 0.92 }, { translateX: -20 }],
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemEmoji: {
    fontSize: 48,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4845',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemSubtitle: {
    fontSize: 16,
    color: '#6A6663',
    opacity: 0.9,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionCard: {
    width: '30%',
    backgroundColor: '#FAF9F8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#5A5856',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EFEDEA',
  },
  actionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4845',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: '#FAF9F8',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#5A5856',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EFEDEA',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFEC',
  },
  activityText: {
    fontSize: 14,
    color: '#4A4845',
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#7A7672',
  },
});

export default App;