import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

class SpareBalatasArranger extends Component {
  spareBalataChosen = (id, dots) => {
    let chosenBalata = {
      id: id,
      dots: dots,
      belongsTo: "spare"
    };

    this.props.onSpareBalataChosen(
      chosenBalata,
      this.props.spareBalatas,
      this.props.player1Balatas,
      this.props.player2Balatas,
      this.props.allBalatas,
      this.props.whoseTurn
    );
  };

  render() {
    return (
      <View style={styles.balatas}>
        {this.props.spareBalatas && this.props.spareBalatas.length >= 1
          ? this.props.spareBalatas.map((balata, i) => {
              console.log(balata.id);
              return (
                <Balata
                  dots={balata.dots}
                  id={balata.id}
                  key={balata.id}
                  orientation="horizontalHeadToLeft"
                  flipped
                  longPressable
                  longPressed={this.spareBalataChosen}
                />
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balatas: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20
  }
});

const mapStateToProps = state => {
  return {
    spareBalatas: state.domino.spareBalatas,
    player1Balatas: state.domino.player1Balatas,
    player2Balatas: state.domino.player2Balatas,
    allBalatas: state.domino.allBalatas,
    whoseTurn: state.domino.whoseTurn
  };
};

const mapDispatchToProps = {
  onSpareBalataChosen: dominoActions.onSpareBalataChosen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpareBalatasArranger);
