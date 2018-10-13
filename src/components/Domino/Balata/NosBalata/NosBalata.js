import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

export default class NosBalata extends Component {
  state = {
    leftColDots: 0,
    centerColDots: 0,
    rightColDots: 0
  };

  componentDidMount() {
    switch (this.props.dots) {
      case 0:
        this.setState(() => ({
          leftColDots: 0,
          centerColDots: 0,
          rightColDots: 0
        }));
        break;

      case 1:
        this.setState(() => ({
          leftColDots: 0,
          centerColDots: 1,
          rightColDots: 0
        }));
        break;

      case 2:
        this.setState(() => ({
          leftColDots: 1,
          centerColDots: 0,
          rightColDots: 1
        }));
        break;
      case 3:
        this.setState(() => ({
          leftColDots: 1,
          centerColDots: 1,
          rightColDots: 1
        }));
        break;
      case 4:
        this.setState(() => ({
          leftColDots: 2,
          centerColDots: 0,
          rightColDots: 2
        }));
        break;
      case 5:
        this.setState(() => ({
          leftColDots: 2,
          centerColDots: 1,
          rightColDots: 2
        }));
        break;
      case 6:
        this.setState(() => ({
          leftColDots: 3,
          centerColDots: 0,
          rightColDots: 3
        }));
        break;

      default:
        break;
    }
  }

  render() {
    let leftColDotsArr = [];
    let centerColDotsArr = [];
    let rightColDotsArr = [];
    for (let i = 0; i < this.state.leftColDots; i++) {
      leftColDotsArr.push(i);
    }
    for (let i = 0; i < this.state.centerColDots; i++) {
      centerColDotsArr.push(i);
    }
    for (let i = 0; i < this.state.rightColDots; i++) {
      rightColDotsArr.push(i);
    }

    return (
      <View
        style={[
          styles.root,
          {
            justifyContent: this.props.dots === 1 ? "center" : "space-between",
            alignItems: this.props.dots === 1 ? "center" : "flex-start",
            paddingLeft: this.props.dots === 6 ? 10 : 0.1,
            paddingTop: this.props.dots === 6 ? 2 : -1,
            borderWidth: this.props.flipped ? 0 : 1
          }
        ]}
      >
        <View
          style={[styles.col, { marginLeft: this.props.dots === 6 ? -3 : 0 }]}
        >
          {leftColDotsArr.map(key => {
            return (
              <View
                key={key}
                style={{
                  margin: this.props.dots === 6 ? -6 : 0
                }}
              >
                <Text
                  style={{ color: this.props.flipped ? "#cecece" : "black" }}
                >
                  &#9679;
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.col}>
          {centerColDotsArr.map(key => {
            return (
              <View
                key={key}
                style={{
                  paddingTop:
                    this.props.dots === 3 || this.props.dots === 5 ? "50%" : 0,
                  margin: this.props.dots === 6 ? -6 : 0
                }}
              >
                <Text
                  style={{ color: this.props.flipped ? "#cecece" : "black" }}
                >
                  &#9679;
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={[styles.col, { marginRight: this.props.dots === 6 ? -3 : 0 }]}
        >
          {rightColDotsArr.map(key => {
            return (
              <View
                key={key}
                style={{
                  paddingTop:
                    this.props.dots === 2 || this.props.dots === 3 ? 10 : 0,
                  margin: this.props.dots === 6 ? -6 : 0
                }}
              >
                <Text
                  style={{ color: this.props.flipped ? "#cecece" : "black" }}
                >
                  &#9679;
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    width: 30,
    height: 30,
    flexDirection: "row",
    backgroundColor: "#cecece",
    alignContent: "space-around"
  },
  col: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around"
  }
});
