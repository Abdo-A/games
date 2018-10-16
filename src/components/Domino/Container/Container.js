import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../store/actions/dominoActions";
import GroundBalatasArranger from "../BalatasArranger/GroundBalatasArranger/GroundBalatasArranger";
import PlayerBalatasArranger from "../BalatasArranger/PlayerBalatasArranger/PlayerBalatasArranger";
import SpareBalatasArranger from "../BalatasArranger/SpareBalatasArranger/SpareBalatasArranger";
import Announcement from "./Announcement";

class Container extends Component {
  componentDidMount() {
    this.props.setRandomInitialBalatasForPlayers(this.props.allBalatas);
  }

  render() {
    //handle if the user hasn't chosen his opponent yet
    if (this.props.awaitingChoosingOpponent) {
      return (
        <Announcement
          header="Choose your opponent"
          buttonOneTitle="Play with your friend"
          buttonTwoTitle="Play with the computer"
          buttonOnePress={() => this.props.onDecideOpponent("person")}
          buttonTwoPress={() => this.props.onDecideOpponent("computer")}
        />
      );
    }

    //handle if game is finished
    if (this.props.winner) {
      return (
        <Announcement
          header={
            this.props.winner === "player1"
              ? "Player 1"
              : this.props.player2Identity + " Won"
          }
          buttonOneTitle="Continue playing"
          buttonTwoTitle="Play a different game"
          buttonOnePress={this.props.resetGameAndPlay}
          buttonTwoPress={this.props.goToHome}
        />
      );
    }

    return (
      <View style={styles.root}>
        <PlayerBalatasArranger player="player2" />

        <GroundBalatasArranger />

        <PlayerBalatasArranger player="player1" />

        <View style={{ position: "absolute", left: 0 }}>
          <SpareBalatasArranger />
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

const mapStateToProps = state => {
  return {
    allBalatas: state.domino.allBalatas,
    groundBalatas: state.domino.groundBalatas,
    awaitingChoosingOpponent: state.domino.awaitingChoosingOpponent,
    player2Identity: state.domino.player2Identity,
    winner: state.domino.winner
  };
};

const mapDispatchToProps = {
  setRandomInitialBalatasForPlayers:
    dominoActions.setRandomInitialBalatasForPlayers,
  onDecideOpponent: dominoActions.onDecideOpponent,
  resetGameAndPlay: dominoActions.resetGameAndPlay,
  quitGame: dominoActions.quitGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
