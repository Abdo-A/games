import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../store/actions/dominoActions";
import GroundBalatasArranger from "../BalatasArranger/GroundBalatasArranger/GroundBalatasArranger";
import PlayerBalatasArranger from "../BalatasArranger/PlayerBalatasArranger/PlayerBalatasArranger";
import SpareBalatasArranger from "../BalatasArranger/SpareBalatasArranger/SpareBalatasArranger";

class Container extends Component {
  componentDidMount() {
    this.props.setRandomInitialBalatasForPlayers(this.props.allBalatas);
  }

  render() {
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
    groundBalatas: state.domino.groundBalatas
  };
};

const mapDispatchToProps = {
  setRandomInitialBalatasForPlayers:
    dominoActions.setRandomInitialBalatasForPlayers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
