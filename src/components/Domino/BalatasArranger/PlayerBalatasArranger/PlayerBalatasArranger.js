import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

//expected props: player

class PlayerBalatasArranger extends Component {
  state = {
    flipAllBalatas: null //"flip", "unflip", "dontcare"
  };

  onBalataChosen = (id, dots) => {
    let chosenBalata = {
      id: id,
      dots: dots,
      belongsTo: this.props.player
    };

    if (this.props.player === this.props.whoseTurn) {
      this.props.onBalataChosen(
        chosenBalata,
        this.props.player1Balatas,
        this.props.player2Balatas,
        this.props.groundBalatas,
        this.props.allBalatas,
        this.props.whoseTurn
      );

      this.props.toggleSpareBalatas(false);

      if (
        this.props.player2Identity === "computer" &&
        this.props.whoseTurn === "player2"
      ) {
        this.props.onComputerTurn(
          this.props.player1Balatas,
          this.props.player2Balatas,
          this.props.groundBalatas,
          this.props.allBalatas,
          this.props.spareBalatas,
          this.props.whoseTurn
        );
      }

      this.props.checkWinner();
    } else {
      alert("It's not your turn");
    }
  };

  flipOrUnflipAllBalatas(flipOrUnflip) {
    if (flipOrUnflip === "flip") {
      this.setState(() => ({
        flipAllBalatas: "flip"
      }));
    } else if (flipOrUnflip === "unflip") {
      this.setState(() => ({
        flipAllBalatas: "unflip"
      }));
    }
  }

  showSpareBalatas = () => {
    this.props.toggleSpareBalatas(true);
  };

  render() {
    let playerBalatas;
    if (this.props.player == "player1") {
      playerBalatas = this.props.player1Balatas;
    } else {
      playerBalatas = this.props.player2Balatas;
    }

    let computerBalatas = false;
    if (
      this.props.player === "player2" &&
      this.props.player2Identity === "computer"
    ) {
      computerBalatas = true;
    }

    return (
      <View style={styles.root}>
        <View
          style={[
            styles.optionsContainer,
            { opacity: computerBalatas ? 0 : 1 }
          ]}
        >
          <Menu
            style={{
              transform: [
                { rotate: this.props.player === "player2" ? "180deg" : "0deg" }
              ]
            }}
          >
            <MenuTrigger>
              <View style={styles.button}>
                <Text>Options</Text>
              </View>
            </MenuTrigger>
            <MenuOptions
              style={{
                transform: [
                  {
                    rotate: this.props.player === "player2" ? "180deg" : "0deg"
                  }
                ]
              }}
            >
              <MenuOption
                onSelect={() => this.flipOrUnflipAllBalatas("flip")}
                text="Hide all"
              />
              <MenuOption
                onSelect={() => this.flipOrUnflipAllBalatas("unflip")}
                text="Show all"
              />
              <MenuOption
                onSelect={this.showSpareBalatas}
                text="Add extra balata"
                disabled={this.props.player !== this.props.whoseTurn}
              />
            </MenuOptions>
          </Menu>
        </View>

        {playerBalatas
          ? playerBalatas.map((balata, i) => {
              return (
                <View style={styles.balata} key={balata.id}>
                  <Balata
                    dots={balata.dots}
                    id={balata.id}
                    orientation="vertical"
                    longPressable={!computerBalatas}
                    flippable={!computerBalatas}
                    flipped
                    longPressed={this.onBalataChosen}
                    suddenFlip={this.state.flipAllBalatas}
                  />
                </View>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row"
  },
  balata: {
    marginHorizontal: 5
  },
  optionsContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cacaca",
    width: 60,
    height: 30
  }
});

const mapStateToProps = state => {
  return {
    player1Balatas: state.domino.player1Balatas,
    player2Balatas: state.domino.player2Balatas,
    allBalatas: state.domino.allBalatas,
    groundBalatas: state.domino.groundBalatas,
    whoseTurn: state.domino.whoseTurn,
    player2Identity: state.domino.player2Identity,
    spareBalatas: state.domino.spareBalatas
  };
};

const mapDispatchToProps = {
  onBalataChosen: dominoActions.onBalataChosen,
  toggleSpareBalatas: dominoActions.toggleSpareBalatas,
  onComputerTurn: dominoActions.onComputerTurn,
  checkWinner: dominoActions.checkWinner
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBalatasArranger);
