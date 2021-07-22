import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  views: {
    alignItems: 'center',
    flexDirection: 'column',
    height,
    backgroundColor: '#343A40',
    width,
    justifyContent: 'center',
  },
  height: height,
  width: width,
});
