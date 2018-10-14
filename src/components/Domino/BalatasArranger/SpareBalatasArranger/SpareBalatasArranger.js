import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import React, { Component } from "react";

import Balata from "../../Balata/Balata";

class SpareBalatasArranger extends Component {
  spareBalataChosen = (id, dots) => {
    let chosenBalata = {
      id: id,
      dots: dots,
      belongsTo: "spare"
    };

    console.log(chosenBalata, " spare balata is chosen!");
  };

  render() {
    return (
      <View style={styles.root}>
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
  root: {
    flexDirection: "column",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    spareBalatas: state.domino.spareBalatas
  };
};

export default connect(mapStateToProps)(SpareBalatasArranger);
