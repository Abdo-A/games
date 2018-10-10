import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import Balata from "../Balata/Balata";
import GroundBalatasArranger from "../BalatasArranger/GroundBalatasArranger.js/GroundBalatasArranger";

export default class Container extends Component {
  state = {
    draggedBalataId: null,
    draggedBalataFinalX: null,
    draggedBalataFinalY: null
  };

  componentDidMount() {
    this.love.measure((fx, fy, width, height, px, py) => {
      console.log("Component width is: " + width);
      console.log("Component height is: " + height);
      console.log("X offset to frame: " + fx);
      console.log("Y offset to frame: " + fy);
      console.log("X offset to page: " + px);
      console.log("Y offset to page: " + py);
    });
  }
  render() {
    return (
      <View style={styles.root}>
        <View
          ref={ref => (this.love = ref)}
          style={{ backgroundColor: "tomato", width: 50, height: 50 }}
        />

        <GroundBalatasArranger />

        <Balata dots={[0, 0]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
});
