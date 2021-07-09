import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../styles/mainStyles';

export default class PostDetail extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={styles.views}>
            <Text style={styles.text}>PANTALLA POST DETAIL</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
