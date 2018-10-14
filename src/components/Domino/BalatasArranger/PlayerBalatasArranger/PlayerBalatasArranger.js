import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

//expected props: player

class PlayerBalatasArranger extends Component {
  onBalataChosen = (id, dots) => {
    let chosenBalata = {
      id: id,
      dots: dots,
      belongsTo: this.props.player
    };

    this.props.onBalataChosen(
      chosenBalata,
      this.props.player1Balatas,
      this.props.player2Balatas,
      this.props.groundBalatas,
      this.props.allBalatas,
      this.props.whoseTurn
    );
  };

  render() {
    let playerBalatas;
    if (this.props.player == "player1") {
      playerBalatas = this.props.player1Balatas;
    } else {
      playerBalatas = this.props.player2Balatas;
    }

    return (
      <View style={styles.root}>
        <View style={styles.spareBalataContainer}>
          <TouchableOpacity style={styles.spareButton}>
            <Text style={{ fontSize: 10 }}>Extra Balata</Text>
          </TouchableOpacity>
        </View>

        {playerBalatas
          ? playerBalatas.map((balata, i) => {
              return (
                <View style={styles.balata} key={balata.id}>
                  <Balata
                    dots={balata.dots}
                    id={balata.id}
                    orientation="vertical"
                    longPressable
                    flippable
                    longPressed={this.onBalataChosen}
                  />
                </View>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row"
  },
  balata: {
    marginHorizontal: 5
  },
  spareBalataContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  spareButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cacaca",
    width: 60,
    height: 30
  }
});

const mapStateToProps = state => {
  return {
    player1Balatas: state.domino.player1Balatas,
    player2Balatas: state.domino.player2Balatas,
    allBalatas: state.domino.allBalatas,
    groundBalatas: state.domino.groundBalatas,
    whoseTurn: state.domino.whoseTurn
  };
};

const mapDispatchToProps = {
  onBalataChosen: dominoActions.onBalataChosen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBalatasArranger);
