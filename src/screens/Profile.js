import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../styles/mainStyles';

export default class Profile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={styles.views}>
            <Text style={styles.text}>PANTALLA PROFILE</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
