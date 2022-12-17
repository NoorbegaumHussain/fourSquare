import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const ReviewCard = ({name, userReview, date}) => {
  const {height, width} = useWindowDimensions();
  return (
    <TouchableOpacity style={styles.Container}>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 20,
            height: 52,
          }}>
          <Image
            source={require('../../assets/images/profile1.png')}
            style={{height: 45, width: 45, borderRadius: 50}}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '90%',
            }}>
            <View style={{width: '60%', marginLeft: 20}}>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 16,
                  color: '#7A7A7A',
                  marginTop: 0,
                }}>
                {userReview}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#7A7A7A',
                }}>
                {date}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};

export default ReviewCard;
const styles = StyleSheet.create({
  hotelimg: {
    height: 140,
    width: 140,
  },
  star: {
    tintColor: 'red',
  },
  line: {
    // borderWidth:0.3,
    height: 0.4,
    backgroundColor: '#8D8D8d',
    marginTop:15
  },
});
