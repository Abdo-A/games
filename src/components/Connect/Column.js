import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";

class Column extends Component {
  state = {
    columnBackgroundColor: "#fff",
    coins: [],
    lastCoinIndex: -1
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentPlayer === "computer" &&
      nextProps.computerPlaysNow === true &&
      nextProps.selectedColumnIdByComputer === this.props.columnIndex &&
      !this.props.gameFinished &&
      !this.props.gameFinishedIndicator
    ) {
      this.onColumnPress("byComputer");

      this.setState(() => ({
        columnBackgroundColor: "#cebfb3"
      }));

      setTimeout(() => {
        this.setState(() => ({
          columnBackgroundColor: "#fff"
        }));
      }, 300);
    }
  }

  onColumnPress = computerToken => {
    //check if the game is finished
    if (this.props.gameFinished || this.props.gameFinishedIndicator) {
      return;
    }

    //check if it is the computer
    if (
      this.props.currentPlayer === "computer" &&
      !(computerToken === "byComputer")
    ) {
      return;
    }

    if (this.state.lastCoinIndex < 5) {
      let coins = [...this.state.coins];

      coins.unshift({
        color: this.props.currentPlayer === "player1" ? "red" : "blue"
      });

      this.setState(
        prevState => ({
          coins: this.props.gameFinished ? prevState.coins : coins,
          lastCoinIndex: prevState.lastCoinIndex + 1
        }),
        () => {
          this.props.onColumnPress(
            this.props.columnIndex,
            this.props.currentPlayer === "player1" ? "red" : "blue"
          );
        }
      );
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onColumnPress}
        onPressIn={() =>
          this.setState({ columnBackgroundColor: "rgba(162, 76, 76, 0.74)" })
        }
        onPressOut={() => this.setState({ columnBackgroundColor: "#fff" })}
      >
        <View
          style={[
            styles.root,
            { backgroundColor: this.state.columnBackgroundColor }
          ]}
        >
          <View style={styles.line}>
            <Text>Hi</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />

          {this.state.coins.map((coin, i) => {
            return (
              <MaterialIcons
                key={i}
                name="cancel"
                size={45}
                color={coin.color}
              />
            );
          })}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    height: "100%",
    width: 48.4,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    height: "16.5%"
  }
});

export default Column;
