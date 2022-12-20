import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeTab from '../navigation/HomeTab';
const HomeScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? '37%' : '30%';
  const height1 = width < height ? '62%' : '100%';

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#310D20"
      />
      <View style={styles.backgroundBeyoundSafeArea}>
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <Icon
                name="menu"
                size={32}
                color="#FFFFFF"
                style={styles.menubar}
              />
            </TouchableOpacity>
            {/* <Image
              source={require('../../assets/images/menu_icon.png')}
              style={styles.menubar}
            /> */}
            <Image
              source={require('../../assets/images/logo.png')}
              style={[styles.logo, {width: width1, height: height1}]}
            />
            <View style={styles.rightHeaderContainer}>
              <TouchableOpacity>
                <Icon
                  name="filter"
                  size={25}
                  color="#FFFFFF"
                  style={styles.filter}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchScreen')}>
                <Icon
                  name="search"
                  size={25}
                  color="#FFFFFF"
                  style={styles.search}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View style={{flex: 1}}>
        <HomeTab />
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#370F24',
    paddingVertical: 10,
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  logo: {
    alignSelf: 'center',
    marginLeft: 36,
  },
  menubar: {
    marginLeft: 15,
  },
  filter: {
    marginRight: 15,
    transform: [{scaleX: -1}],
  },
  search: {},
});
