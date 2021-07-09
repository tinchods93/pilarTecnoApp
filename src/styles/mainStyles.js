import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A3241D',
    textAlign: 'center',
  },
  text2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A3241D',
    textAlign: 'center',
  },
  simpleButtonContainer: {
    backgroundColor: 'rgba(255,255,255, 0.9)',
  },
  views: {
    alignItems: 'center',
    flexDirection: 'column',
    height,
    justifyContent: 'center',
  },
  button: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  height: height,
});
