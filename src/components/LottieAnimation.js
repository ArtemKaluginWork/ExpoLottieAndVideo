import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

export default class LottieAnimation extends Component {
  constructor(props) {
    super(props);
    this.animation = React.createRef();
  }

  componentDidMount() {
    setTimeout(this.playAnimation, 500);
  }

  componentDidUpdate(prevProps) {
    const { animation } = this.props;
    if (prevProps.animation !== animation) {
      this.playAnimation();
    }
  }

  playAnimation = () => {
    const { animation } = this.props;

    if (animation && this.animation && this.animation.current) {
      this.animation.current.reset();
      this.animation.current.play();
    }
  };

  render() {
    const { animation } = this.props;

    return (
      <View style={styles.animationsContainer}>
        {animation && (
          <Lottie
            ref={this.animation}
            style={styles.animation}
            source={animation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationsContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animation: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
