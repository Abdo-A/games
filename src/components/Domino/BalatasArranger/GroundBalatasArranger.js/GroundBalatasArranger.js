import { MaterialIcons } from "@expo/vector-icons";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";

import Balata from "../../Balata/Balata";

export default class GroundBalatasArranger extends Component {
  state = {
    balatas: [],
    firstBalataX: null,
    firstBalataY: null,
    lastBalataX: null,
    lastBalataY: null
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.draggedBalata &&
      Math.abs(props.draggedBalata.X - state.firstBalataX) < 50 &&
      Math.abs(props.draggedBalata.Y - state.firstBalataY) < 20
    ) {
      console.log("It is getting near!");
    }

    return null;
  }

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

  getFirstBalataMeasure = (id, px, py) => {
    console.log("first balata X", px);
    console.log("first balata Y", py);
    this.setState(() => ({
      firstBalataX: px,
      firstBalataY: py
    }));
  };

  getLastBalataMeasure = (id, px, py) => {
    console.log("last balata X", px);
    console.log("last balata Y", py);
    this.setState(() => ({
      lastBalataX: px,
      lastBalataY: py
    }));
  };

  render() {
    return (
      <View style={styles.root}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: "center",
            paddingLeft: "40%",
            paddingRight: "40%"
          }}
        >
          {this.state.balatas.length >= 1 ? (
            this.state.balatas.map((balata, i) => {
              return (
                <Balata
                  dots={balata.dots}
                  id={balata.id}
                  key={balata.id}
                  orientation={balata.orientation}
                  getMeasure={
                    i === 0
                      ? this.getFirstBalataMeasure
                      : this.getLastBalataMeasure
                  }
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
        </ScrollView>
        <Button title="Add Balata" onPress={this.addBalata} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "30%",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "brown"
  }
});
