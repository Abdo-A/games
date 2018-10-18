import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import React, { Component } from "react";

class ScoreDisplayer extends Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.scoreSide}>
          <Text style={styles.text}>
            {this.props.player2Identity === "computer"
              ? "Computer"
              : "Player 2"}{" "}
          </Text>
          <Text style={styles.text}>{this.props.player2Score} </Text>
        </View>
        <View style={styles.scoreSide}>
          <Text style={styles.text}>Player 1</Text>
          <Text style={styles.text}>{this.props.player1Score} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
    height: "100%",
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    backgroundColor: "#6393F3"
  },
  text: {
    color: "#fff"
  },
  scoreSide: {
    flexDirection: "column",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    player1Score: state.domino.player1Score,
    player2Score: state.domino.player2Score,
    player2Identity: state.domino.player2Identity
  };
};

export default connect(mapStateToProps)(ScoreDisplayer);
