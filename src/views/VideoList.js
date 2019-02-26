import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Dimensions, StyleSheet, AsyncStorage, ScrollView, Image} from 'react-native';

const { width, height } = Dimensions.get('window');
const PLAY = require('../../assets/play-icon.png');

export default class VideoList extends Component {
  state = {
    listVideos: null,
  };

  async componentDidMount() {
    try {
      const videos = await AsyncStorage.getItem('videos');

      if (videos !== null) {
        this.setState({ listVideos: JSON.parse(videos) });
      }
    } catch (e) {
      alert(e);
    }
  }

  setActivePage = (page, video) => {
    this.props.navigation.navigate(page, { source: { uri: video } });
  };

  render() {
    const { listVideos } = this.state;

    return (
      <View style={styles.listContainer}>
        <ScrollView styel={{ flex: 1, width, height }}>
          {listVideos && listVideos.map((video, index) =>
            <TouchableOpacity
              key={video + index}
              style={styles.videoContainer}
              onPress={() => this.setActivePage('PlaybackVideo', video)}
            >
              <View style={styles.video}>
                <Image
                  style={styles.playIcon}
                  source={PLAY}
                />
              </View>
              <Text style={styles.nameVideo}>
                Video {index + 1}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        {!listVideos && <Text style={styles.defaultText}>Empty</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width,
    backgroundColor: '#fff',
  },
  videoContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eae9e9',
    margin: 10,
  },
  video: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  nameVideo: {
    fontSize: 18,
    marginLeft: 10,
  },
  defaultText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});