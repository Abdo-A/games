import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Balata from "../../Balata/Balata";
import { MaterialIcons } from "@expo/vector-icons";

export default class GroundBalatasArranger extends Component {
  state = {
    balatas: []
  };

  addBalata = () => {
    const newBalata = {
      dots: [1, 1],
      id: Math.random(),
      orientation: Math.random() >= 0.5 ? "horizontal" : "vertical"
    };
    let balatas = [...this.state.balatas];
    balatas.push(newBalata);
    this.setState(() => ({
      balatas: balatas
    }));
  };

  render() {
    return (
      <TouchableOpacity onPress={this.addBalata} style={styles.root}>
        {this.state.balatas.length >= 1 ? (
          this.state.balatas.map(balata => {
            return (
              <Balata
                dots={balata.dots}
                id={balata.id}
                key={balata.id}
                orientation={balata.orientation}
              />
            );
          })
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={25}
            color="black"
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  }
});
