import { MaterialIcons } from "@expo/vector-icons";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";

import Balata from "../../Balata/Balata";

export default class GroundBalatasArranger extends Component {
  state = {
    balatas: [],
    firstBalata: {
      id: null,
      dots: [],
      X: null,
      Y: null
    },
    lastBalata: {
      id: null,
      dots: [],
      X: null,
      Y: null
    },
    aBalataIsNear: false
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.draggedBalata &&
      ((Math.abs(props.draggedBalata.X - state.firstBalata.X) < 50 &&
        Math.abs(props.draggedBalata.Y - state.firstBalata.Y) < 20) ||
        (Math.abs(props.draggedBalata.X - state.lastBalata.X) < 50 &&
          Math.abs(props.draggedBalata.Y - state.lastBalata.Y) < 20))
    ) {
      return {
        ...state,
        aBalataIsNear: true
      };
    } else {
      return {
        ...state,
        aBalataIsNear: false
      };
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

  getFirstBalataMeasure = (id, dots, px, py) => {
    // console.log("first balata X", px);
    // console.log("first balata Y", py);
    console.log("first balata dots: ", dots);
    this.setState(() => ({
      firstBalata: {
        id: id,
        dots: dots,
        X: px,
        Y: py
      }
    }));
  };

  getLastBalataMeasure = (id, dots, px, py) => {
    // console.log("last balata X", px);
    // console.log("last balata Y", py);
    console.log("last balata dots: ", dots);

    this.setState(() => ({
      lastBalata: {
        id: id,
        dots: dots,
        X: px,
        Y: py
      }
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
        <Button
          title={this.state.aBalataIsNear ? "OMG!" : "no near"}
          onPress={this.addBalata}
        />
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
