import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import NosBalata from "./NosBalata/NosBalata";

//expected props: id, dots (array), clickable (boolean), clicked (function)

export default class Balata extends Component {
  state = {
    id: null,
    dots: [],
    flipped: false
  };

  componentDidMount() {
    this.setState(() => ({
      id: this.props.id,
      dots: this.props.dots
    }));
  }

  clicked = () => {
    this.props.clicked(this.state.id, this.props.dots);

    this.setState(prevState => ({
      flipped: !prevState.flipped
    }));
  };

  render() {
    const balataBody = (
      <View style={styles.container}>
        <View
          style={[
            styles.balata,
            {
              width: this.props.orientation === "horizontal" ? 60 : 30,
              height: this.props.orientation === "horizontal" ? 30 : 60,
              flexDirection:
                this.props.orientation === "horizontal" ? "row" : "column"
            }
          ]}
        >
          <NosBalata dots={this.props.dots[0]} flipped={this.state.flipped} />
          <NosBalata dots={this.props.dots[1]} flipped={this.state.flipped} />
        </View>
      </View>
    );

    if (this.props.clickable) {
      return (
        <TouchableOpacity onPress={this.clicked}>{balataBody}</TouchableOpacity>
      );
    } else {
      return balataBody;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 2
  },
  balata: {
    padding: 0,
    alignItems: "center"
  }
});
