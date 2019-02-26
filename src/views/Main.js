import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default class Main extends Component {
  setActivePage = (page) => {
    this.props.navigation.navigate(page);
  };

  toRecordVideo = () => {
    this.setActivePage('RecordVideo');
  };

  toVideoList = () => {
    this.setActivePage('VideoList');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.buttonRecords} onPress={this.toRecordVideo}>
          <Text style={styles.textGray}>
            RECORD VIDEO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonVideos} onPress={this.toVideoList}>
          <Text style={styles.textWhite}>
            SAVED VIDEOS
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRecords: {
    width: '90%',
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9a9aa5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  buttonVideos: {
    width: '90%',
    height: 60,
    backgroundColor: '#9a9aa5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    fontSize: 18,
    color: '#fff',
  },
  textGray: {
    fontSize: 18,
    color: '#9a9aa5',
  },
});
