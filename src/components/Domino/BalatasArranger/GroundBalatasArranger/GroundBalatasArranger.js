import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

class GroundBalatasArranger extends Component {
  render() {
    return (
      <View style={styles.root}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: "center",
            paddingLeft: "46%",
            paddingRight: "46%"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    height: 130,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "brown"
  }
});

const mapStateToProps = state => {
  return {
    groundBalatas: state.domino.groundBalatas
  };
};

export default connect(mapStateToProps)(GroundBalatasArranger);
