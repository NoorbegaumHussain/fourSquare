import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const CustomModal = ({visible, children, onPress}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent={true} visible={showModal} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View
            style={{
              bottom: 15,
              width: '100%',
              borderWidth: 1.5,
              borderColor: '#7a7a7a',
              width: 29,
              height: 29,
              backgroundColor: '#FFFFFF',
              borderRadius: 50,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: -13,
            }}>
            <TouchableOpacity style={{}} onPress={onPress}>
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: '93.5%'}}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(122, 122, 122, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '55%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderWidth: 1.5,
  },
  image: {
    // height: 18,
    // width: 18,
    tintColor: '#000000',
    alignSelf: 'center',
  },
});
