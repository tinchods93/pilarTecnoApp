import React, {Component} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {commonStyles} from '../styles/mainStyles';

import {connect} from 'react-redux';
import {actions} from '../store';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      photoURL: '',
      password: '',
    };
  }

  onPressRegister = async () => {
    const {email, password} = this.state;
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created!');
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email!');
        }
        Alert.alert('Please check the input data');
      });
  };

  render() {
    const {email, password} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <Text style={styles.title}> Create User </Text>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={styles.input}
              placeholder="Insert your email"
              value={email}
              leftIcon={<Icon name="user" style={styles.icons} />}
              onChangeText={em => this.setState({email: em})}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              placeholder="Insert your password"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              leftIcon={<Icon name="lock" style={styles.icons} />}
              onChangeText={psw => this.setState({password: psw})}
            />
          </View>
          <TouchableOpacity
            onPress={this.onPressRegister}
            style={styles.loginButton}>
            <Text style={styles.loginButtontext}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.loginButton}>
            <Text style={styles.loginButtontext}>Return to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {fontSize: 30, color: '#ADB5BD'},
  icons: {
    fontSize: 24,
    color: '#ADB5BD',
  },
  containerButtons: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E9ECEF',
  },
  loginButton: {
    width: width / 1.3,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    height: 40,
    backgroundColor: '#495057',
  },
  loginButtontext: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CED4DA',
  },
  registerButton: {
    width: width / 1.3,
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
  },
  registerButtontext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#6C757D',
  },
});

export default Create;
