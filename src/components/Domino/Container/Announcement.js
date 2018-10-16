import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

//expected props:
// header (string), buttonOneTitle (string), buttonTwoTitle (string)
// buttonOnePress (function), buttonTwoPress (function)

const Announcement = props => {
  return (
    <View>
      <Text style={styles.announcementHeader}>{props.header}</Text>
      <View style={{ marginBottom: 30 }}>
        <Button title={props.buttonOneTitle} onPress={props.buttonOnePress} />
      </View>
      <Button title={props.buttonTwoTitle} onPress={props.buttonTwoPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  announcementHeader: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#C8AA10",
    marginBottom: 30
  }
});

export default Announcement;
