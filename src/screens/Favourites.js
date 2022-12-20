import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RestaurantDetails from '../components/RestaurantDetails';
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
const Favourites = ({navigation}) => {
  const handleCardClick = () => {
    navigation.navigate('RestaurantDetailScreen');
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={handleCardClick}>
        <RestaurantDetails
          image={
            <Image
              source={require('../../assets/images/close.png')}
              style={styles.favIcon}
            />
          }
        />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#F0F0F0',
        },
      ]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#310D20"
      />
      <View style={styles.backgroundBeyoundSafeArea}>
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}>
              <View style={styles.backIconContainer}>
                <Image
                  source={require('../../assets/images/back_icon.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 11,
              }}>
              <Text style={styles.text}>Favourites</Text>

              <View style={styles.searchSection}>
                <Icon
                  name="search"
                  size={23}
                  color="#CCCCCC"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="#CCCCCC"
                  // onFocus={() =>
                  //   setFocus(prev => ({
                  //     nearme: {hasfocus: false},
                  //     search: {hasfocus: true},
                  //   }))
                  // }
                  // onChangeText={searchString => {
                  //   setSearch({searchString});
                  // }}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              {/* {filterClicked ? (
                <TouchableOpacity
                  onPress={() => setFilterClicked(!filterClicked)}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              ) : ( */}
              <Icon
                name="filter"
                size={25}
                color="#FFFFFF"
                style={styles.filter}
                // onPress={() => setFilterClicked(!filterClicked)}
              />
              {/* )} */}
            </View>
          </View>
        </SafeAreaView>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Favourites;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#370F24',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  backIcon: {
    height: 23,
    width: 25,
    marginTop: 3,
  },
  backIconContainer: {
    width: 40,
    fontWeight: '500',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#ffffff',
    color: '#424242',
    borderRadius: 5,
    width: '60%',
  },
  filterContainer: {
    width: 40,
    alignItems: 'center',
    fontWeight: '500',
  },
  filter: {
    transform: [{scaleX: -1}],
    marginTop: 3,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 24.5,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  favIcon: {
    // paddingLeft: 10,
    marginTop: 9,
    resizeMode: 'contain',
    width: 16,
    height: 16,
    marginRight: 5,
  },
});
