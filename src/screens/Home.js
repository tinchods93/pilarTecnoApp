import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from '../styles/mainStyles';

export default class Home extends Component {
  _onHomePress = () => {
    Alert.alert('Hola', 'Ya te encuentras ahí', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={styles.views}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this._onHomePress()}
                style={[styles.button, styles.simpleButtonContainer]}>
                <Text style={styles.text2}>Principal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.simpleButtonContainer]}>
                <Text style={styles.text2}>Perfil</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={[styles.button, {}]}>
                <Text style={styles.text2}>Posteos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.simpleButtonContainer]}>
                <Text style={styles.text2}>Mapa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
