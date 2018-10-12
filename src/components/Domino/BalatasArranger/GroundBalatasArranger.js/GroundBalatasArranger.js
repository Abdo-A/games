import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

class GroundBalatasArranger extends Component {
  state = {
    balatas: [],
    firstBalata: {
      id: null,
      dots: [],
      X: null,
      Y: null
    },
    lastBalata: {
      id: null,
      dots: [],
      X: null,
      Y: null
    },
    aBalataIsNear: false
  };

  addBalata = () => {
    const newBalata = {
      dots: [1, 1],
      id: Math.random(),
      orientation: Math.random() >= 0.5 ? "horizontal" : "vertical"
    };
    let balatas = [...this.state.balatas];
    balatas.push(newBalata);
    this.setState(() => ({
      balatas: balatas
    }));
  };

  getFirstBalataMeasure = (id, dots, px, py) => {
    // console.log("first balata X", px);
    // console.log("first balata Y", py);
    // console.log("first balata dots: ", dots);
    // this.setState(() => ({
    //   firstBalata: {
    //     id: id,
    //     dots: dots,
    //     X: px,
    //     Y: py
    //   }
    // }));
    this.props.setFirstGroundBalata({
      id: id,
      dots: dots,
      X: px,
      Y: py
    });
  };

  getLastBalataMeasure = (id, dots, px, py) => {
    // console.log("last balata X", px);
    // console.log("last balata Y", py);
    // console.log("last balata dots: ", dots);

    // this.setState(() => ({
    //   lastBalata: {
    //     id: id,
    //     dots: dots,
    //     X: px,
    //     Y: py
    //   }
    // }));

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
        <Button
          title={this.state.aBalataIsNear ? "OMG!" : "no near"}
          onPress={this.addBalata}
        />
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
    draggedBalata: state.domino.draggedBalata
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
