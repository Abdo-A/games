import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import NosBalata from "./NosBalata/NosBalata";

//expected props:
//id, dots (array)

//optional props:
//longPressable (boolean), longPressed (function, if longPressable is true)
//orientation (string), flipped (boolean), flippable (boolean), suddenFlip (string, "flip", "unflip", "dontcare")

export default class Balata extends Component {
  state = {
    id: null,
    dots: [],
    flipped: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.suddenFlip === "flip") {
      this.setState(() => ({
        flipped: true
      }));
    } else if (nextProps.suddenFlip === "unflip") {
      this.setState(() => ({
        flipped: false
      }));
    }
  }

  componentDidMount() {
    this.setState(() => ({
      id: this.props.id,
      dots: this.props.dots
    }));

    if (this.props.flipped) {
      this.setState(() => ({
        flipped: true
      }));
    }
  }

  pressed = () => {
    if (this.props.flippable)
      this.setState(prevState => ({
        flipped: !prevState.flipped
      }));
  };

  longPressed = () => {
    if (this.props.longPressable)
      this.props.longPressed(this.state.id, this.props.dots);
  };

  render() {
    let balataBody = (
      <View style={styles.container}>
        <View
          style={[
            styles.balata,
            {
              width:
                this.props.orientation === "horizontalHeadToLeft" ||
                this.props.orientation === "horizontalTailToLeft"
                  ? 60
                  : 30,
              height:
                this.props.orientation === "horizontalHeadToLeft" ||
                this.props.orientation === "horizontalTailToLeft"
                  ? 30
                  : 60,
              flexDirection:
                this.props.orientation === "horizontalHeadToLeft" ||
                this.props.orientation === "horizontalTailToLeft"
                  ? "row"
                  : "column"
            }
          ]}
        >
          <NosBalata dots={this.props.dots[0]} flipped={this.state.flipped} />
          <NosBalata dots={this.props.dots[1]} flipped={this.state.flipped} />
        </View>
      </View>
    );

    if (this.props.orientation === "horizontalTailToLeft") {
      balataBody = (
        <View style={styles.container}>
          <View
            style={[
              styles.balata,
              {
                width:
                  this.props.orientation === "horizontalHeadToLeft" ||
                  this.props.orientation === "horizontalTailToLeft"
                    ? 60
                    : 30,
                height:
                  this.props.orientation === "horizontalHeadToLeft" ||
                  this.props.orientation === "horizontalTailToLeft"
                    ? 30
                    : 60,
                flexDirection:
                  this.props.orientation === "horizontalHeadToLeft" ||
                  this.props.orientation === "horizontalTailToLeft"
                    ? "row"
                    : "column"
              }
            ]}
          >
            <NosBalata dots={this.props.dots[1]} flipped={this.state.flipped} />
            <NosBalata dots={this.props.dots[0]} flipped={this.state.flipped} />
          </View>
        </View>
      );
    }

    if (this.props.longPressable || this.props.flippable) {
      return (
        <TouchableOpacity onPress={this.pressed} onLongPress={this.longPressed}>
          {balataBody}
        </TouchableOpacity>
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
