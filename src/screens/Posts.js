import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {commonStyles} from '../styles/mainStyles';

export default class Posts extends Component {
  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={commonStyles.views}>
            <Text style={commonStyles.text}>PANTALLA POSTS</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
