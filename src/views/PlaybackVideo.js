import React, { Component, Fragment } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { Video } from 'expo';

import ScrollViewAnimation from '../components/ScrollViewAnimation';

const { width } = Dimensions.get('window');

export default class PlaybackVideo extends Component {
  render() {
    const source = this.props.navigation.getParam('source', null);

    return (
      <View style={styles.videoContainer}>
        {!source ? <Text>Ooops... Could not play video</Text> : (
          <Fragment>
            <Video
              source={source}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.video}
            />
            <ScrollViewAnimation />
          </Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    width,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: width,
    height: width,
  },
});