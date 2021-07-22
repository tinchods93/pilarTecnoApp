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
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

GoogleSignin.configure({
  webClientId:
    '9949671647-1o4vb8snrcqikvvv7hkho45m44hon1sv.apps.googleusercontent.com',
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential);
  };

  render() {
    const {email, password} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <Text style={styles.title}> Login </Text>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={styles.input}
              placeholder="Ingrese email"
              value={email}
              leftIcon={<Icon name="user" style={styles.icons} />}
              onChangeText={em => this.setState({email: em})}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              leftIcon={<Icon name="lock" style={styles.icons} />}
              onChangeText={psw => this.setState({password: psw})}
            />
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              onPress={() => {
                email,
                  password
                    ? auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(async data => {
                          console.log('Signed in with e-mail!');
                          if (data) {
                            console.log(
                              'res login: ' + JSON.stringify(data.user),
                            );
                            try {
                              await AsyncStorage.setItem(
                                'isloged',
                                JSON.stringify(data.user),
                              );
                            } catch (e) {
                              console.log('Hubo un error :' + e);
                            }
                            this.props.setUser(data.user);
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        })
                    : Alert.alert('complete todos los campos');
              }}
              style={styles.loginButton}>
              <Text style={styles.loginButtontext}>Sign In</Text>
            </TouchableOpacity>
            <Text>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() =>
                  this.onGoogleButtonPress()
                    .then(async data => {
                      console.log('Signed in with Google!');
                      if (data) {
                        console.log('res login: ' + JSON.stringify(data.user));
                        try {
                          await AsyncStorage.setItem(
                            'isloged',
                            JSON.stringify(data.user),
                          );
                        } catch (e) {
                          console.log('There was a error:' + e);
                        }
                        this.props.setUser(data.user);
                      }
                    })
                    .catch(err =>
                      console.log('Error en el login de google==>', err),
                    )
                }
              />
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Create')}
              style={styles.registerButton}>
              <Text style={styles.registerButtontext}>Crear Usuario</Text>
            </TouchableOpacity>
          </View>
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
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
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

const mapDispatchToProps = dispatch => ({
  setUser: data => dispatch(actions.user.setUser(data)),
});
const mapStateToProps = state => ({
  user: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
