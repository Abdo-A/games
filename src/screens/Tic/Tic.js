import { StyleSheet, BackHandler, Text, View } from "react-native";
import React, { Component } from "react";

import Grid from "../../components/Tic/Grid";
import Header from "../../components/Header";

export default class Tic extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.history.goBack();
    return true;
  };

  render() {
    return (
      <View>
        <Header>My Tic Tac Toe</Header>
        <Grid />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
