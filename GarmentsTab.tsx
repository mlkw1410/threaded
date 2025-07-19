// GarmentsTab.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2; // 2 items per row with padding

// Dummy data for garments - replace with Supabase data later
const dummyGarments = [
  { id: '1', name: 'Blue Denim Jeans', image: 'https://via.placeholder.com/150/ADD8E6/000000?text=Jeans' },
  { id: '2', name: 'White T-Shirt', image: 'https://via.placeholder.com/150/FFFFFF/000000?text=T-Shirt' },
  { id: '3', name: 'Red Floral Dress', image: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Dress' },
  { id: '4', name: 'Black Leather Jacket', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Jacket' },
  { id: '5', name: 'Striped Blouse', image: 'https://via.placeholder.com/150/FFD700/000000?text=Blouse' },
  { id: '6', name: 'Green Skirt', image: 'https://via.placeholder.com/150/90EE90/000000?text=Skirt' },
];

const GarmentsTab: React.FC = () => {
  const renderGarmentItem = ({ item }: { item: { id: string; name: string; image: string } }) => (
    <View style={styles.garmentItem}>
      <Image source={{ uri: item.image }} style={styles.garmentImage} />
      <Text style={styles.garmentName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {dummyGarments.length > 0 ? (
        <FlatList
          data={dummyGarments}
          renderItem={renderGarmentItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No garments added yet. Tap "Add Item" to start!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F0',
    padding: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  garmentItem: {
    backgroundColor: '#FAF9F8',
    borderRadius: 12,
    padding: 10,
    margin: 5,
    width: ITEM_WIDTH,
    alignItems: 'center',
    shadowColor: '#5A5856',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EFEDEA',
  },
  garmentImage: {
    width: '100%',
    height: ITEM_WIDTH, // Make image square
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#E8E5E1', // Placeholder background
  },
  garmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4845',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#7A7672',
  },
});

export default GarmentsTab;