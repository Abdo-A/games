import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { Component } from "react";

class Cell extends Component {
  state = {
    value: "",
    pressedBefore: false,
    myColor: "red"
  };

  IamPressed = () => {
    if (this.state.pressedBefore === false) {
      this.setState(
        () => {
          return {
            value: this.props.next,
            pressedBefore: true
          };
        },
        () => {
          //let the value be nothing if the game is finished
          if (this.props.gameFinished === true) {
            this.setState(() => ({
              value: ""
            }));
          }
          //add the value to the cell :D
          this.props.setaSquareValue(this.state.value, this.props.mynumber);
        }
      );

      this.setState(() => ({
        myColor: this.props.next === "X" ? "red" : "white"
      }));
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.IamPressed}>
        <View style={styles.CellStyle}>
          <Text
            style={{
              color: this.state.myColor,
              textAlign: "center",
              fontSize: 30
            }}
          >
            {this.state.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  CellStyle: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "black",
    justifyContent: "center"
  }
});

export default Cell;
