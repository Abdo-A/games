import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

class GroundBalatasArranger extends Component {
  addBalata = () => {
    console.log("hi");
  };

  getFirstBalataMeasure = (id, dots, px, py) => {
    this.props.setFirstGroundBalata({
      id: id,
      dots: dots,
      X: px,
      Y: py
    });
  };

  getLastBalataMeasure = (id, dots, px, py) => {
    this.props.setLastGroundBalata({
      id: id,
      dots: dots,
      X: px,
      Y: py
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: "center",
            paddingLeft: "40%",
            paddingRight: "40%"
          }}
        >
          {this.props.groundBalatas && this.props.groundBalatas.length >= 1 ? (
            this.props.groundBalatas.map((balata, i) => {
              return (
                <Balata
                  dots={balata.dots}
                  id={balata.id}
                  key={balata.id}
                  orientation={balata.orientation}
                  getMeasure={
                    i === 0
                      ? this.getFirstBalataMeasure
                      : i === this.props.groundBalatas.length - 1
                        ? this.getLastBalataMeasure
                        : () => {}
                  }
                />
              );
            })
          ) : (
            <View>
              <MaterialIcons
                name="radio-button-unchecked"
                size={25}
                color="black"
              />
            </View>
          )}
        </ScrollView>
        <Button title={"hi"} onPress={this.addBalata} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "30%",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "brown"
  }
});

const mapStateToProps = state => {
  return {
    groundBalatas: state.domino.groundBalatas,
    firstGroundBalata: state.domino.firstGroundBalata,
    lastGroundBalata: state.domino.lastGroundBalata,
    draggedBalata: state.domino.draggedBalata,

    player1Balatas: state.domino.player1Balatas,
    player2Balatas: state.domino.player2Balatas
  };
};

const mapDispatchToProps = {
  makeAllBalatasBelongToGround: dominoActions.makeAllBalatasBelongToGround,
  setFirstGroundBalata: dominoActions.setFirstGroundBalata,
  setLastGroundBalata: dominoActions.setLastGroundBalata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroundBalatasArranger);
