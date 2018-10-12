import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import Balata from "../Balata/Balata";
import GroundBalatasArranger from "../BalatasArranger/GroundBalatasArranger.js/GroundBalatasArranger";

export default class Container extends Component {
  state = {
    draggedBalata: {
      id: null,
      X: null,
      Y: null
    }
  };

  getDraggedBalata = (id, px, py) => {
    if (
      this.state.draggedBalataId !== id ||
      this.state.draggedBalataFinalX !== px ||
      this.state.draggedBalataFinalY !== py
    ) {
      this.setState(() => ({
        draggedBalata: {
          id: id,
          X: px,
          Y: py
        }
      }));
      console.log("dragged Balata Id:", id);
      console.log("dragged Balata X:", px);
      console.log("dragged Balata Y:", py);
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <View style={{ backgroundColor: "tomato", width: 50, height: 50 }} />

        <GroundBalatasArranger draggedBalata={this.state.draggedBalata} />

        <View style={{ flexDirection: "row" }}>
          <Balata dots={[0, 0]} draggable getMeasure={this.getDraggedBalata} />
          <Balata dots={[1, 4]} draggable getMeasure={this.getDraggedBalata} />
          <Balata dots={[2, 6]} draggable getMeasure={this.getDraggedBalata} />
          <Balata dots={[2, 1]} draggable getMeasure={this.getDraggedBalata} />
          <Balata dots={[0, 3]} draggable getMeasure={this.getDraggedBalata} />
          <Balata dots={[0, 4]} draggable getMeasure={this.getDraggedBalata} />
        </View>
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
