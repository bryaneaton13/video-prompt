import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import Orientation from 'react-native-orientation';

import ReviewVideo from '../ReviewVideo';

export default class RecordVideo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      video: null,
    };

    this.toggleCamera = this.toggleCamera.bind(this);
  }

  componentDidMount() {
    Orientation.getOrientation((err, orientation) => {
      if (err || orientation !== 'LANDSCAPE') {
        Orientation.lockToLandscapeRight();
        Orientation.lockToLandscape();
      }
    });
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }
  
  toggleCamera() {
    if (this.state.isRecording) {
      this.camera.stopCapture();
      this.setState({ isRecording: false });
      return;
    }

    const options = {
      totalSeconds: 5,
    };
    //options.location = ...
    this.setState({ isRecording: true });
    this.camera.capture(options).then((data) => {
      this.setState({
        isRecording: false,
        video: data,
      });
    }).catch((err) => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.video ? (
            <ReviewVideo
              onClose={() => this.setState({ video: null, isRecording: false })}
              onSave={() => this.props.onSave(this.state.video.path)}
              path={this.state.video.path}
            />
          ) : (
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              captureAudio={true}
              style={styles.preview}
              captureTarget={Camera.constants.CaptureTarget.temp}
              captureMode={Camera.constants.CaptureMode.video}
              aspect={Camera.constants.Aspect.fill}>
              <Text
                style={[styles.capture, this.state.isRecording ? styles.red : null ]}
                onPress={this.toggleCamera}
              >
                {!this.state.isRecording ? 'Take Video' : 'Stop Video'}
              </Text>
              <Text style={styles.close} onPress={this.props.onClose}>
                Close Part {this.props.part || '-'}
              </Text>
            </Camera>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  close: {
    position: 'absolute',
    backgroundColor: 'transparent',
    fontSize: 18,
    color: '#fff',
    top: 10,
    left: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#000',
    padding: 20,
    margin: 30,
  },
  red: {
    backgroundColor: '#f64',
  },
});
