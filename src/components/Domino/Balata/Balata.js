import { View, StyleSheet } from "react-native";
import Draggable from "react-native-drag";
import React, { Component } from "react";

import NosBalata from "./NosBalata/NosBalata";

export default class Balata extends Component {
  state = {
    id: null,
    dots: [],
    X: null,
    Y: null
  };

  componentDidMount() {
    this.setState(() => ({
      id: Math.random(),
      dots: this.props.dots
    }));

    if (this.props.getMeasure) this.sendMeasure();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  sendMeasure = () => {
    this.interval = setInterval(() => {
      this.balataRef.measure((fx, fy, width, height, px, py) => {
        if (this.state.X !== px || this.state.Y !== py) {
          this.setState(() => ({
            X: px,
            Y: py
          }));
          this.props.getMeasure(this.state.id, this.props.dots, px, py);
        }
      });
    }, 100);
  };

  render() {
    const balataBody = (
      <View style={styles.container} ref={ref => (this.balataRef = ref)}>
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
          <NosBalata dots={this.props.dots[0]} />
          <NosBalata dots={this.props.dots[1]} />
        </View>
      </View>
    );

    if (this.props.draggable) {
      return (
        <View>
          <Draggable>{balataBody}</Draggable>
        </View>
      );
    } else {
      return <View>{balataBody}</View>;
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
