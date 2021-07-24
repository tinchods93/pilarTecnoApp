import React, {Component} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Avatar, Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {actions} from '../store';
import {commonStyles} from '../styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      photoURL: '',
      name: '',
    };
  }
  componentDidMount = () => {
    const {user} = this.props;
    this.setState({
      email: user.providerData[0].email,
      photoURL: user.providerData[0].photoURL,
      name: user.providerData[0].displayName,
    });
  };
  render() {
    const {email, photoURL, name} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <View style={styles.dataContainer}>
            <View style={styles.avatarContainer}>
              {photoURL !== '' ? (
                <Avatar rounded source={{uri: photoURL}} size="xlarge" />
              ) : (
                <Avatar
                  rounded
                  source={require('../assets/images/avatar.png')}
                  size="xlarge"
                />
              )}
            </View>
            <Text style={styles.infoText}>{email}</Text>
            <Text style={styles.infoText}>{name}</Text>
            <TouchableOpacity
              style={commonStyles.primaryBtn}
              onPress={() => {
                auth()
                  .signOut()
                  .then(async () => {
                    console.log('User signed out!'),
                      this.props.setUser({user: null});
                    try {
                      await AsyncStorage.removeItem('isloged');
                    } catch (e) {
                      console.log('hubo un error :' + e);
                    }
                  });
              }}>
              <Text style={commonStyles.primaryBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    width,
    alignItems: 'center',
  },
  logoutButton: {
    height: height / 20,
    width: width / 3,
    ...commonStyles.primaryBtn,
  },
  infoText: {
    fontSize: 18,
    color: '#F7F8F9',
  },
});
const mapDispatchToProps = dispatch => ({
  setUser: ({user}) => dispatch(actions.user.setUser({user})),
});
const mapStateToProps = state => ({
  user: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
