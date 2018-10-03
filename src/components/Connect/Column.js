import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";

class Column extends Component {
  state = {
    coins: [],
    lastCoinIndex: -1,
    cellBackgroundColor: "#76c4ae"
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
        cellBackgroundColor: "#cebfb3"
      }));

      setTimeout(() => {
        this.setState(() => ({
          cellBackgroundColor: "#76c4ae"
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
      <TouchableOpacity onPress={this.onColumnPress}>
        <View style={[styles.root]}>
          <View
            style={[
              styles.cell,
              { bottom: 0, backgroundColor: this.state.cellBackgroundColor }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>

          <View
            style={[
              styles.cell,
              {
                bottom: "16.6%",
                backgroundColor: this.state.cellBackgroundColor
              }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>

          <View
            style={[
              styles.cell,
              {
                bottom: "33.2%",
                backgroundColor: this.state.cellBackgroundColor
              }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>

          <View
            style={[
              styles.cell,
              {
                bottom: "49.8%",
                backgroundColor: this.state.cellBackgroundColor
              }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>

          <View
            style={[
              styles.cell,
              {
                bottom: "66.4%",
                backgroundColor: this.state.cellBackgroundColor
              }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>
          <View
            style={[
              styles.cell,
              {
                bottom: "83%",
                backgroundColor: this.state.cellBackgroundColor
              }
            ]}
          >
            <View style={styles.cellCenter} />
          </View>

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
    borderColor: "white",
    height: "100%",
    width: 48.4,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  cell: {
    height: "16.6%",
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: "white",
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    alignItems: "center"
  },
  cellCenter: {
    height: "70%",
    width: "70%",
    borderRadius: 1000,
    backgroundColor: "white"
  }
});

export default Column;
