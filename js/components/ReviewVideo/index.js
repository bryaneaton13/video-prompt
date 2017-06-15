import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';

export default class RecordVideo extends Component {

  constructor(props) {
    super(props);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.saveVideo = this.saveVideo.bind(this);
  }

  deleteVideo() {
    RNFS.unlink(this.props.path)
    .then(() => {
      console.warn('File deleted');
      this.props.onClose();
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.warn(err.message);
      this.props.onClose();
    });
  }

  saveVideo() {
    RNFS.unlink(this.props.path)
    .then(() => {
      console.warn('Saving...but actually deleting', this.props.path);
      this.props.onSave();
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.warn(err.message);
      this.props.onSave();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: this.props.path }}
          ref={(ref) => {
            this.player = ref;
          }}
          style={styles.video}
          repeat={true}
        />
        <Text style={[styles.option, styles.close]} onPress={this.deleteVideo}>
          Delete video
        </Text>
        <Text style={[styles.option, styles.save]} onPress={this.saveVideo}>
          Save video
        </Text>
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
  option: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    fontSize: 18,
    borderRadius: 15,
    color: '#fff',
    top: 25,
  },
  close: {
    left: 15,
  },
  save: {
    right: 15,
  },
  video: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
