import React, { Component } from "react";
import { TextInput, Platform, StyleSheet, Text, View } from "react-native";
import Tic from "./src/screens/Tic/Tic";
import Start from "./src/screens/Start/Start";

import { NativeRouter, Route, Switch } from "react-router-native";

import Connect from "./src/screens/Connect/Connect";

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/tic" component={Tic} />
          <Route path="/connect4" component={Connect} />
        </Switch>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({});
