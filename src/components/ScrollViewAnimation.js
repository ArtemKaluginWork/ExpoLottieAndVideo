import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native';

import LottieAnimation from './LottieAnimation';
import ANIMATIONS from './AnimationsConstants';

const { width } = Dimensions.get('window');

export default class ScrollViewAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: null,
    };
  }

  setNameOfAnimation = (source) => {
    this.setState({ animation: source });
  };

  render() {
    const { animation } = this.state;

    return (
      <Fragment>
        <View style={styles.overlayAnimation}>
          <LottieAnimation animation={animation} />
        </View>
        <ScrollView horizontal style={styles.scrollContainer}>
          <View style={styles.animationsContainer}>
            {ANIMATIONS.map(({ id, source }) => (
              <TouchableOpacity
                key={id}
                style={styles.animationBlock}
                onPress={() => this.setNameOfAnimation(source)}
              >
                <LottieAnimation animation={source}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width,
    height: 100,
    backgroundColor: '#eae9e9',
  },
  animationsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  animationBlock: {
    flex: 1,
    width: 80,
    height: 80,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  overlayAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});