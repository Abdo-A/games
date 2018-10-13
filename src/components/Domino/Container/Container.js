import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../store/actions/dominoActions";
import Balata from "../Balata/Balata";
import GroundBalatasArranger from "../BalatasArranger/GroundBalatasArranger.js/GroundBalatasArranger";

class Container extends Component {
  state = {
    draggedBalata: {
      id: null,
      dots: [],
      X: null,
      Y: null
    }
  };

  componentDidMount() {
    this.props.setRandomFirstGroundBalata(this.props.allBalatas);
    this.props.setRandomInitialBalatasForPlayers(this.props.allBalatas);
  }

  getDraggedBalata = (id, dots, px, py) => {
    if (
      this.props.draggedBalata.id !== id ||
      this.props.draggedBalata.X !== px ||
      this.props.draggedBalata.Y !== py
    ) {
      // this.setState(() => ({
      //   draggedBalata: {
      //     id: id,
      //     dots: dots,
      //     X: px,
      //     Y: py
      //   }
      // }));
      this.props.setDraggedBalata({
        id: id,
        dots: dots,
        X: px,
        Y: py
      });
      // console.log("dragged Balata Id:", id);
      // console.log("dragged Balata X:", px);
      // console.log("dragged Balata Y:", py);
      //console.log("Dragged balata dots:", dots);
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
    return (
      <View style={styles.root}>
        <View style={{ backgroundColor: "tomato", width: 50, height: 50 }} />

        <GroundBalatasArranger />

        <View style={{ flexDirection: "row" }}>
          <Balata
            dots={[0, 0]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
          <Balata
            dots={[1, 4]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
          <Balata
            dots={[2, 6]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
          <Balata
            dots={[2, 1]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
          <Balata
            dots={[0, 3]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
          <Balata
            dots={[0, 4]}
            draggable
            onDragRelease={this.onBalataDragRelease}
            getMeasure={this.getDraggedBalata}
          />
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
    draggedBalata: state.domino.draggedBalata,
    firstGroundBalata: state.domino.firstGroundBalata,
    lastGroundBalata: state.domino.lastGroundBalata
  };
};

const mapDispatchToProps = {
  setRandomFirstGroundBalata: dominoActions.setRandomFirstGroundBalata,
  setRandomInitialBalatasForPlayers:
    dominoActions.setRandomInitialBalatasForPlayers,
  setDraggedBalata: dominoActions.setDraggedBalata,
  onDraggedBalataRelease: dominoActions.onDraggedBalataRelease
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
