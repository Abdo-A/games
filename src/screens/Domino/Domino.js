import { StyleSheet, View, BackHandler, Text } from "react-native";
import Expo from "expo";
import React, { Component } from "react";
import Container from "../../components/Domino/Container/Container";

export default class Domino extends Component {
  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.history.goBack();
    return true;
  };

  goToHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <View style={styles.root}>
        <Container goToHome={this.goToHome} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
