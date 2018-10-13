import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

//expected props: player

class PlayerBalatasArranger extends Component {
  getDraggedBalata = (id, dots, px, py) => {
    if (
      this.props.draggedBalata.id !== id ||
      this.props.draggedBalata.X !== px ||
      this.props.draggedBalata.Y !== py
    ) {
      this.props.setDraggedBalata({
        id: id,
        dots: dots,
        X: px,
        Y: py
      });
    }
  };

  onBalataDragRelease = () => {
    this.props.onDraggedBalataRelease(
      this.props.draggedBalata,
      this.props.firstGroundBalata,
      this.props.lastGroundBalata,
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
                    onDragRelease={this.onBalataDragRelease}
                    getMeasure={this.getDraggedBalata}
                    draggable
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
    groundBalatas: state.domino.groundBalatas,
    draggedBalata: state.domino.draggedBalata,
    firstGroundBalata: state.domino.firstGroundBalata,
    lastGroundBalata: state.domino.lastGroundBalata
  };
};

const mapDispatchToProps = {
  setDraggedBalata: dominoActions.setDraggedBalata,
  onDraggedBalataRelease: dominoActions.onDraggedBalataRelease
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBalatasArranger);
