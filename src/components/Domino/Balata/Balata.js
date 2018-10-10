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
        <Draggable
          onDragRelease={this.onDragRelease}
          containerStyle={styles.container}
        >
          <View
            style={[
              styles.balata,
              {
                width: this.props.orientation === "horizontal" ? 60 : 30,
                height: this.props.orientation === "horizontal" ? 30 : 60,
                flexDirection:
                  this.props.orientation === "horizontal" ? "row" : "column"
              }
            ]}
          >
            <NosBalata dots={this.props.dots[0]} />
            <NosBalata dots={this.props.dots[1]} />
          </View>
        </Draggable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2
  },
  balata: {
    padding: 0,
    alignItems: "center"
  }
});
