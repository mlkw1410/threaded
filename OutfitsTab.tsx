
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2; // 2 items per row with padding

// Dummy data for outfits - replace with generated outfits later
const dummyOutfits = [
  { id: '1', name: 'Casual Weekend', image: 'https://via.placeholder.com/150/FFB6C1/000000?text=Outfit+1' },
  { id: '2', name: 'Work Chic', image: 'https://via.placeholder.com/150/87CEEB/000000?text=Outfit+2' },
  { id: '3', name: 'Evening Glam', image: 'https://via.placeholder.com/150/DA70D6/000000?text=Outfit+3' },
  { id: '4', name: 'Sporty Look', image: 'https://via.placeholder.com/150/32CD32/000000?text=Outfit+4' },
];

const OutfitsTab: React.FC = () => {
  const renderOutfitItem = ({ item }: { item: { id: string; name: string; image: string } }) => (
    <View style={styles.outfitItem}>
      <Image source={{ uri: item.image }} style={styles.outfitImage} />
      <Text style={styles.outfitName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {dummyOutfits.length > 0 ? (
        <FlatList
          data={dummyOutfits}
          renderItem={renderOutfitItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No outfits generated yet. Choose your mood to create one!</Text>
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
  outfitItem: {
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
  outfitImage: {
    width: '100%',
    height: ITEM_WIDTH, // Make image square
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#E8E5E1', // Placeholder background
  },
  outfitName: {
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

export default OutfitsTab;