import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {actions} from '../store';
import {capitalize} from '../helpers/capitalizer';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {commonStyles} from '../styles/mainStyles';

const {height, width} = Dimensions.get('window');

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_posts: null,
      selectedPost: '',
      selectedPostIndex: '',
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }
  componentDidUpdate() {
    if (this.props.posts && this.state.current_posts !== this.props.posts) {
      this.setState({current_posts: this.props.posts});
    }
  }

  changeTab = async tabName => {
    const {selectedPost, selectedPostIndex} = this.state;
    try {
      await AsyncStorage.setItem(
        'selectedPost',
        JSON.stringify({item: selectedPost, index: selectedPostIndex}),
      );
      if (selectedPost !== '') {
        this.props.navigation.navigate(tabName);
      }
    } catch (e) {
      console.log('Hubo un error guardando el ID del item :', e);
    }
  };

  renderPost = ({item, index}) => {
    return (
      <Post
        title={item.title}
        key={item.id}
        onPress={() =>
          this.setState({selectedPost: item, selectedPostIndex: index})
        }
        selected={item.id === this.state.selectedPost.id}
      />
    );
  };

  render() {
    const {current_posts} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <View style={styles.buttonBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostCreate')}
              style={styles.button}>
              <Text style={styles.buttonText}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeTab('PostDetail')}
              style={styles.button}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeTab('PostEdit')}
              style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={current_posts}
            renderItem={this.renderPost}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const Post = ({title, onPress, selected}) => {
  return (
    <TouchableOpacity
      style={selected ? styles.selectedItem : styles.item}
      onPress={onPress}>
      <Text style={selected ? styles.selectedTitle : styles.title}>
        {capitalize(title)}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    width,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#E9ECEF',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#343A40',
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
    color: '#495057',
  },
  selectedTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
    color: '#0E0F10',
  },
  selectedItem: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
    backgroundColor: '#F9CF86',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(actions.posts.getPosts()),
});
const mapStateToProps = state => ({
  posts: state.posts.posts,
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
