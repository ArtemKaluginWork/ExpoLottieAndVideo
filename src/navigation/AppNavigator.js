import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from '../views/Main';
import RecordVideo from '../views/RecordVideo';
import VideoList from '../views/VideoList';
import PlaybackVideo from '../views/PlaybackVideo';

const AppStack = createStackNavigator({
  Main,
  RecordVideo,
  VideoList,
  PlaybackVideo,
}, {
  initialRouteName: 'Main',
});

export default createAppContainer(AppStack);