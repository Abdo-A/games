import { NativeRouter, Route, Switch } from "react-router-native";
import { TextInput, Platform, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import Connect from "./src/screens/Connect/Connect";
import Domino from "./src/screens/Domino/Domino";
import Start from "./src/screens/Start/Start";
import Tic from "./src/screens/Tic/Tic";

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/tic" component={Tic} />
          <Route path="/connect4" component={Connect} />
          <Route path="/domino" component={Domino} />
        </Switch>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({});
