import React, { Component } from "react";
import { Text } from "react-native";
import NosBalata from "./NosBalata/NosBalata";

export default class Balata extends Component {
  render() {
    return (
      <View>
        <NosBalata />
        <NosBalata />
      </View>
    );
  }
}
