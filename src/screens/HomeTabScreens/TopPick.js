import {View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import RestaurantDetails from '../../components/RestaurantDetails';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571sdse29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145rew571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96jh145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571em,n29d72',
    title: 'Third Item',
  },
];

const TopPick = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <Pressable onPress={handleCardClick}>
        <RestaurantDetails />
      </Pressable>
    );
  };
  
  const handleCardClick = () => {
    navigation.navigate('RestaurantDetailScreen');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TopPick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
});
