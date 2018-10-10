import { View } from "react-native";
import React, { Component } from "react";

import Balata from "../Balata/Balata";

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
      <View>
        <View
          ref={ref => (this.love = ref)}
          style={{ backgroundColor: "tomato", width: 50, height: 50 }}
        />

        <Balata dots={[0, 0]} />
        <Balata dots={[1, 2]} />
        <Balata dots={[3, 4]} />
        <Balata dots={[5, 6]} />
      </View>
    );
  }
}
