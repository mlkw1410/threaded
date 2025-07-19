import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native'; // Keeping these imports, though not strictly used in this file's direct render

// Import the tab content screens (assuming they are in the same folder)
import GarmentsTab from './GarmentsTab';
import OutfitsTab from './OutfitsTab';

const Tab = createBottomTabNavigator();

const ClosetScreen: React.FC = () => {
  return (
    <Tab.Navigator
      // Removed swipeEnabled and tabBarIndicatorStyle as they are not valid props for BottomTabNavigator
      screenOptions={{
        headerShown: false, // Hide header as Stack.Navigator in App.tsx handles it
        tabBarActiveTintColor: '#4A4845', // Active tab color
        tabBarInactiveTintColor: '#7A7672', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#F8F7F5', // Tab bar background
          borderTopWidth: 1,
          borderTopColor: '#E8E5E1',
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Garments"
        component={GarmentsTab}
        options={{
          tabBarLabel: 'Garments',
          // You can add icons here later if you want, e.g.:
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="hanger" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Outfits"
        component={OutfitsTab}
        options={{
          tabBarLabel: 'Outfits',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="tshirt-crew" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ClosetScreen;