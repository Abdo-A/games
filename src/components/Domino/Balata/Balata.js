import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
import Draggable from "react-native-drag";

import NosBalata from "./NosBalata/NosBalata";

export default class Balata extends Component {
  state = {
    id: null
  };

  componentDidMount() {
    this.setState(() => ({
      id: Math.random()
    }));
  }

  onDragRelease = (X, Y) => {
    console.log("X:" + X, "Y:" + Y);
  };

  render() {
    return (
      <View>
        <Draggable onDragRelease={this.onDragRelease}>
          <View style={styles.root}>
            <NosBalata dots={this.props.dots[0]} />
            <NosBalata dots={this.props.dots[1]} />
          </View>
        </Draggable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 0,
    width: 30,
    height: 60,
    alignItems: "center"
  }
});
