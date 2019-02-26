import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { Camera, Permissions } from 'expo';

const { width, height } = Dimensions.get('window');
const PAUSE = require('../../assets/pause-button.png');
const CAMERA_BACK = Camera.Constants.Type.back;
const CAMERA_FRONT = Camera.Constants.Type.front;
const VIDEO_QUALITY = Camera.Constants.VideoQuality['720p'];

export default class RecordVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: CAMERA_BACK,
      video: null,
      recording: false,
    };
    this.camera = React.createRef();
  }

  async componentDidMount() {
    const { status: statusVideo } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: statusAudio } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    this.setState({ hasCameraPermission: statusVideo === 'granted' && statusAudio === 'granted' });
  }

  handleRecordVideo = async () => {
    const options = {
      quality: VIDEO_QUALITY,
      maxDuration: 15,
      maxFileSize: 200000000,
      mute: false,
    };

    try {
      if (this.camera && this.camera.current) {
        await this.setState({ recording: true });
        const { uri: video } = await this.camera.current.recordAsync(options);
        this.setState({ video, recording: false }, this.storeData);
      }
    } catch(e) {
      this.setState({ recording: false });
      alert(e);
    }
  };

  handleStopVideo = async () => {
    await this.setState({ recording: false });

    if (this.camera && this.camera.current) {
      this.camera.current.stopRecording();
      this.showMessage();
    }
  };

  showMessage = () => {
    Alert.alert(
      'Video stopped',
      'Choose action:',
      [
        {
          text: 'Go to the video',
          onPress: this.navigateToViewVideo
        },
        {text: 'Cancel', onPress: () => {}},
      ],
      { cancelable: false },
    );
  };

  navigateToViewVideo = () => {
    const { video: uri } = this.state;
    const { navigate } = this.props.navigation;
    navigate('PlaybackVideo', { source: { uri } });
  };

  storeData = async () => {
    try {
      const videos = await AsyncStorage.getItem('videos');
      const list = Boolean(videos) ? JSON.parse(videos) : [];

      list.push(this.state.video);
      await AsyncStorage.setItem('videos', JSON.stringify(list));
    } catch (e) {
      alert(e);
    }
  };

  setCameraReady = () => {
    this.setState({ isCameraReady: true })
  };

  flipCamera = () => {
    const { recording } = this.state;

    if (recording) return;

    this.setState(({ type }) => ({
      type: type === CAMERA_BACK ? CAMERA_FRONT : CAMERA_BACK,
    }));
  };

  render() {
    const { hasCameraPermission, recording } = this.state;

    return (
      <View style={styles.flex}>
        {!hasCameraPermission ? <Text>No access to camera</Text> : (
          <View style={styles.flex}>
            <Camera
              onCameraReady={this.setCameraReady}
              style={styles.camera}
              type={ this.state.type }
              ref={this.camera}
            >
              <View style={styles.flipContainer}>
                <TouchableOpacity
                  onPress={this.flipCamera}>
                  <Text style={styles.flipButton}>Flip</Text>
                </TouchableOpacity>
              </View>
              <View
                style={styles.buttonContainer}>
                {!recording ? (
                  <TouchableOpacity style={styles.playButton} onPress={this.handleRecordVideo} />
                ) : (
                  <TouchableOpacity style={styles.pauseButton} onPress={this.handleStopVideo}>
                    <Image style={styles.image} source={PAUSE} />
                  </TouchableOpacity>
              )}
              </View>
            </Camera>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: 60,
    marginRight: 20,
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  pauseButton: {
    width: 60,
    height: 60,
  },
  image: {
    width: 60,
    height: 60,
  },
  flipButton: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
    width,
    height,
  },
  flex: {
    flex: 1,
  }
});