import { View, StyleSheet, Text, Platform } from "react-native";
import React, { Component } from "react";

import Cell from "./Cell";

class Grid extends Component {
  state = {
    squaresValues: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    next: "X",
    result: null,
    gameFinished: false,
    count: 0
  };

  winningTimes(winner) {
    var snapshot = firebase
      .database()
      .ref("Winning times/" + winner)
      .on("value", function(snapshot) {
        return snapshot.val();
      });
    console.log(snapshot);
    firebase
      .database()
      .ref("Winning times/" + winner)
      .set({
        no_of_times: ++snapshot.no_of_times || 0
      })
      .then(data => {
        //success callback
        console.log("data ", data);
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }

  setaSquareValue = (value, index) => {
    if (this.state.gameFinished) {
      this.setState(prevState => {
        return {
          result: "Please start a new game!!"
        };
      });

      return;
    }
    let newSquaresValues = [...this.state.squaresValues];
    newSquaresValues[index] = value;

    this.setState(
      prevState => {
        return {
          squaresValues: newSquaresValues,
          next: prevState.next === "X" ? "O" : "X"
        };
      },
      () => {
        this.checkWinner();
      }
    );
  };

  checkNoWinner = () => {
    this.setState(
      prevState => {
        return {
          count: prevState.count + 1
        };
      },
      () => {
        console.log(this.state.count);
        if (this.state.count === 9) {
          this.setState(() => ({
            result: "No one won !!",
            gameFinished: true
          }));
        }
      }
    );
  };

  checkWinner = () => {
    [
      one,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      nine
    ] = this.state.squaresValues;

    if (
      (one === two && two === three) ||
      (four === five && five === six) ||
      (seven === eight && eight === nine) ||
      (one === four && four === seven) ||
      (two === five && five === eight) ||
      (three === six && six === nine) ||
      (one === five && five === nine) ||
      (three === five && five === seven)
    ) {
      console.log("someone won");
      const winner = this.state.next === "X" ? "O" : "X";
      console.log(winner);
      this.setState(() => ({
        result: winner + " won!!",
        gameFinished: true
      }));
      //this.winningTimes(winner);
    } else {
      this.checkNoWinner();
    }
  };

  render() {
    return (
      <View>
        <View style={styles.columnStyling}>
          <View style={styles.rowStyling}>
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={0}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={1}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={2}
              gameFinished={this.state.gameFinished}
            />
          </View>
          <View style={styles.rowStyling}>
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={3}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={4}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={5}
              gameFinished={this.state.gameFinished}
            />
          </View>

          <View style={styles.rowStyling}>
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={6}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={7}
              gameFinished={this.state.gameFinished}
            />
            <Cell
              setaSquareValue={this.setaSquareValue}
              next={this.state.next}
              mynumber={8}
              gameFinished={this.state.gameFinished}
            />
          </View>
        </View>
        <Text style={styles.textStyling}>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowStyling: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  columnStyling: {
    alignItems: "center"
  },
  textStyling: {
    textAlign: "center",
    color: "red",
    fontSize: 30,
    fontFamily: Platform.OS === "ios" ? "System" : "monospace",
    marginTop: 10
  }
});

export default Grid;
