import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

//expected props: player

class PlayerBalatasArranger extends Component {
  onBalataClicked = (id, dots) => {
    let clickedBalata = {
      id: id,
      dots: dots,
      belongsTo: this.props.player
    };

    this.props.onBalataClicked(
      clickedBalata,
      this.props.player1Balatas,
      this.props.player2Balatas,
      this.props.groundBalatas,
      this.props.allBalatas
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
        {playerBalatas
          ? playerBalatas.map((balata, i) => {
              return (
                <View style={styles.balata} key={balata.id}>
                  <Balata
                    dots={balata.dots}
                    id={balata.id}
                    orientation="vertical"
                    clickable
                    clicked={this.onBalataClicked}
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
  }
});

const mapStateToProps = state => {
  return {
    player1Balatas: state.domino.player1Balatas,
    player2Balatas: state.domino.player2Balatas,
    allBalatas: state.domino.allBalatas,
    groundBalatas: state.domino.groundBalatas
  };
};

const mapDispatchToProps = {
  onBalataClicked: dominoActions.onBalataClicked
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBalatasArranger);
