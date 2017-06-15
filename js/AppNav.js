import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RecordVideo from './components/RecordVideo';

export default class AppNav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: 'prompt',
    };

    this.goToPrompt = this.goToPrompt.bind(this);
  }

  goToPrompt() {
    this.setState({ screen: 'prompt' });
  }

  saveVideo(path) {
    // console.warn('saving video...', path);
  }

  renderScreen() {
    switch (this.state.screen) {
      case 'prompt':
        return (
          <View style={styles.view}>
            <Text style={styles.text} onPress={() => this.setState({ screen: 'record' })}>
              Record part one
            </Text>
            <Text style={styles.text} onPress={() => this.setState({ screen: 'record2' })}>
              Record part two
            </Text>
          </View>
        );
      case 'record':
      case 'record2':
        return (
          <RecordVideo
            part={this.state.screen === 'record' ? 1 : 2}
            onClose={this.goToPrompt}
            onSave={(path) => {
              this.saveVideo(path);
              this.goToPrompt();
            }}
          />
        );
      default:
        return <Text>Nothing Here</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 15,
    backgroundColor: '#36f',
    borderRadius: 50,
    color: '#fff',
    padding: 20,
  },
});
