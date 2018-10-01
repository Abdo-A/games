import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import React, { Component } from "react";

import Column from "./Column";
import Header from "../Header";
import { AISelectColumnEasy } from "./helpers/AISelectColumnEasy";
import { AISelectColumnMedium } from "./helpers/AISelectColumnMedium";
import { AISelectColumnHard } from "./helpers/AISelectColumnHard";

class Container extends Component {
  state = {
    columnsValues: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: []
    },
    currentPlayer: "player1", //player1, player2, computer
    winner: null, //player1, player2, computer
    firstPlayer: "player1", //player1, player2, computer
    secondPlayer: null, //player1, player2, computer
    firstPlayerScore: 0,
    secondPlayerScore: 0,
    gameFinished: false,
    initialFakeLoading: false,
    resetFakeLoading: false,
    awaitingChoosingOpponent: true,
    awaitingChoosingComputerDifficulty: false,
    selectedColumnIdByComputer: null,
    computerPlaysNow: false,
    computerDifficulty: null //easy, medium, hard
  };

  componentDidMount() {
    this.setState(() => ({
      initialFakeLoading: true
    }));

    setTimeout(() => {
      this.setState(() => ({
        initialFakeLoading: false
      }));
    }, 500);

    this.gameFinished = false;
  }

  onColumnPress = (columnIndex, coinType) => {
    this.setColumnsValues(columnIndex, coinType);

    this.setCurrentPlayer();

    this.checkWinningState();
  };

  setColumnsValues = (columnIndex, coinType) => {
    let columnsValues = { ...this.state.columnsValues };
    columnsValues[columnIndex].push(coinType);

    this.setState(
      () => ({
        columnsValues: columnsValues
      }),
      () => {
        //console.log(this.state.columnsValues);
      }
    );
  };

  setCurrentPlayer = () => {
    this.setState(
      prevState => ({
        currentPlayer:
          prevState.currentPlayer === this.state.firstPlayer
            ? this.state.secondPlayer
            : this.state.firstPlayer
      }),
      () => {
        if (this.state.currentPlayer === "computer") {
          this.onComputerTurn();
        }
      }
    );
  };

  checkWinningState = () => {
    let gameState = { ...this.state.columnsValues };

    if (this.state.winner) {
      return;
    }

    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 5; j++) {
        if (
          gameState[i] &&
          gameState[i][j] &&
          gameState[i][j + 1] &&
          gameState[i][j + 2] &&
          gameState[i][j + 3]
        ) {
          if (
            gameState[i][j] == gameState[i][j + 1] &&
            gameState[i][j] == gameState[i][j + 2] &&
            gameState[i][j] == gameState[i][j + 3]
          ) {
            this.setState(prevState => ({
              winner:
                gameState[i][j] === "red" ? "player1" : this.state.secondPlayer,
              firstPlayerScore:
                gameState[i][j] === "red"
                  ? prevState.firstPlayerScore + 1
                  : prevState.firstPlayerScore,
              secondPlayerScore:
                gameState[i][j] === "blue"
                  ? prevState.secondPlayerScore + 1
                  : prevState.secondPlayerScore
            }));
            this.onWinning(
              gameState[i][j] === "red" ? "player1" : this.state.secondPlayer
            );
            this.gameFinished = true;
          }
        }

        if (
          gameState[i] &&
          gameState[i + 1] &&
          gameState[i + 2] &&
          gameState[i + 3] &&
          gameState[i][j] &&
          gameState[i + 1][j] &&
          gameState[i + 2][j] &&
          gameState[i + 3][j]
        ) {
          if (
            gameState[i][j] == gameState[i + 1][j] &&
            gameState[i][j] == gameState[i + 2][j] &&
            gameState[i][j] == gameState[i + 3][j]
          ) {
            this.setState(prevState => ({
              winner:
                gameState[i][j] === "red" ? "player1" : this.state.secondPlayer,
              firstPlayerScore:
                gameState[i][j] === "red"
                  ? prevState.firstPlayerScore + 1
                  : prevState.firstPlayerScore,
              secondPlayerScore:
                gameState[i][j] === "blue"
                  ? prevState.secondPlayerScore + 1
                  : prevState.secondPlayerScore
            }));
            this.onWinning(
              gameState[i][j] === "red" ? "player1" : this.state.secondPlayer
            );
            this.gameFinished = true;
          }
        }
      }
    }
  };

  onWinning = winner => {
    if (winner === "computer") {
      setTimeout(() => {
        this.setState(() => ({
          gameFinished: true
        }));
      }, 400);
    } else {
      this.board.rubberBand(2000).then(() => {
        this.board.lightSpeedOut(500).then(() => {
          this.setState(() => ({
            gameFinished: true
          }));
        });
      });
    }
  };

  onResetAndContinue = () => {
    this.gameFinished = false;

    this.setState(() => ({
      resetFakeLoading: true,
      columnsValues: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
      },
      currentPlayer: "player1",
      winner: null,
      gameFinished: false
    }));

    setTimeout(() => {
      this.setState(() => ({
        resetFakeLoading: false
      }));
    }, 100);
  };

  onReset = () => {
    this.gameFinished = false;

    this.setState(() => ({
      resetFakeLoading: true,
      columnsValues: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
      },
      currentPlayer: "player1",
      winner: null,
      gameFinished: false,
      awaitingChoosingOpponent: true,
      secondPlayer: null
    }));

    setTimeout(() => {
      this.setState(() => ({
        resetFakeLoading: false
      }));
    }, 100);
  };

  onChooseOpponent = value => {
    if (value === "person") {
      this.setState(() => ({
        awaitingChoosingOpponent: false,
        awaitingChoosingComputerDifficulty: false,
        secondPlayer: "player2"
      }));
    } else if (value === "computer") {
      this.setState(() => ({
        awaitingChoosingOpponent: false,
        awaitingChoosingComputerDifficulty: true,
        secondPlayer: "computer"
      }));
    }
  };

  onChooseComputerDifficulty = difficulty => {
    this.setState(() => ({
      computerDifficulty: difficulty,
      awaitingChoosingComputerDifficulty: false
    }));
  };

  onComputerTurn = () => {
    switch (this.state.computerDifficulty) {
      case "easy":
        selectedColumnId = AISelectColumnEasy(this.state.columnsValues);
        break;

      case "medium":
        selectedColumnId = AISelectColumnMedium(this.state.columnsValues);
        break;

      case "hard":
        selectedColumnId = AISelectColumnHard(this.state.columnsValues);
        break;

      default:
        selectedColumnId = AISelectColumnEasy(this.state.columnsValues);
        break;
    }

    this.setState(
      () => ({
        selectedColumnIdByComputer: selectedColumnId
      }),
      () => {
        setTimeout(() => {
          this.setState(() => ({
            computerPlaysNow: true
          }));
        }, 1000);

        setTimeout(() => {
          this.setState(() => ({
            computerPlaysNow: false
          }));
        }, 1200);
      }
    );
  };

  render() {
    //handle initial fake loading
    if (this.state.initialFakeLoading) {
      return (
        <View>
          <Header>My Connect 4</Header>
          <ActivityIndicator size="large" color="#2F4F4F" />
        </View>
      );
    }

    //handle fake loading that happens when clicking reset
    if (this.state.resetFakeLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#2F4F4F" />
        </View>
      );
    }

    //handle if the player hasn't chosen his opponent yet
    if (this.state.awaitingChoosingOpponent) {
      return (
        <View>
          <Text style={styles.winnerAnnouncement}>Choose your opponent</Text>
          <View style={{ marginBottom: 30 }}>
            <Button
              title="Play with your friend"
              onPress={() => this.onChooseOpponent("person")}
            />
          </View>
          <Button
            title="Play with the computer"
            onPress={() => this.onChooseOpponent("computer")}
          />
        </View>
      );
    }

    //handle if the player hasn't chosen his computer opponent difficulty yet
    if (this.state.awaitingChoosingComputerDifficulty) {
      return (
        <View>
          <Text style={styles.winnerAnnouncement}>Choose Difficulty</Text>
          <View style={{ marginBottom: 30 }}>
            <Button
              title="Easy"
              onPress={() => this.onChooseComputerDifficulty("easy")}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <Button
              title="Medium"
              onPress={() => this.onChooseComputerDifficulty("medium")}
            />
          </View>

          <Button
            title="Hard"
            onPress={() => this.onChooseComputerDifficulty("hard")}
          />
        </View>
      );
    }

    //handle if the game is finished
    if (this.state.gameFinished) {
      return (
        <View>
          <Text style={styles.winnerAnnouncement}>
            {this.state.winner} won!
          </Text>
          <View style={{ marginBottom: 30 }}>
            <Button title="Play again" onPress={this.onResetAndContinue} />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Button title="Main Menu" onPress={this.onReset} />
          </View>
          <Button
            title="Play a differnt game"
            onPress={() => this.props.goToHome()}
          />
        </View>
      );
    }

    let player1Turn = this.state.currentPlayer === "player1" ? true : false;

    return (
      <View style={styles.root}>
        <View style={styles.playersNotation}>
          <View style={styles.playerNotation}>
            <Text
              style={{
                fontWeight: player1Turn ? "bold" : "normal"
              }}
            >
              {this.state.firstPlayer === "player1"
                ? "Player 1"
                : this.state.firstPlayer}{" "}
            </Text>
            <MaterialIcons name="cancel" size={20} color="red" />
            <Text style={styles.score}> [{this.state.firstPlayerScore}]</Text>
            {player1Turn && <Text> (Your Turn)</Text>}
          </View>
          <View style={styles.playerNotation}>
            {!player1Turn && <Text>(Your Turn) </Text>}
            <Text
              style={{
                fontWeight: player1Turn ? "normal" : "bold"
              }}
            >
              {this.state.secondPlayer === "player2"
                ? "Player 2"
                : this.state.secondPlayer === "computer"
                  ? "Computer"
                  : this.state.secondPlayer}{" "}
            </Text>
            <MaterialIcons name="cancel" size={20} color="blue" />
            <Text style={styles.score}> [{this.state.secondPlayerScore}]</Text>
          </View>
        </View>
        <Animatable.View
          style={styles.board}
          animation="zoomIn"
          ref={ref => {
            this.board = ref;
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
            <Column
              key={num}
              columnIndex={i}
              selectedColumnIdByComputer={this.state.selectedColumnIdByComputer}
              computerPlaysNow={this.state.computerPlaysNow}
              onColumnPress={this.onColumnPress}
              currentPlayer={this.state.currentPlayer}
              gameFinished={this.state.gameFinished}
              gameFinishedIndicator={this.gameFinished}
            />
          ))}
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {},
  board: {
    width: 550,
    height: 300,
    borderBottomWidth: 20,
    borderRightWidth: 10,
    borderLeftWidth: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    borderColor: "#2F4F4F",
    marginBottom: -10
  },
  playersNotation: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  playerNotation: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  score: {
    fontWeight: "bold",
    color: "brown"
  },
  winnerAnnouncement: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#C8AA10",
    marginBottom: 30
  }
});

export default Container;
