import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class Start extends Component {
  goToTic = () => {
    this.props.history.push("/tic");
  };

  goToConnect = () => {
    this.props.history.push("/connect4");
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.buttonContainer}>
          <Button title="Tic Tac Toe" onPress={this.goToTic} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Connect Four" onPress={this.goToConnect} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    margin: 20
  }
});
