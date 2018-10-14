import { connect } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { Component } from "react";

import * as dominoActions from "../../../../store/actions/dominoActions";
import Balata from "../../Balata/Balata";

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

    return (
      <View style={styles.root}>
        {this.props.player === this.props.whoseTurn && (
          <View style={styles.spareBalataContainer}>
            <TouchableOpacity
              style={styles.spareButton}
              onPress={this.showSpareBalatas}
            >
              <Text style={{ fontSize: 10 }}>Extra Balata</Text>
            </TouchableOpacity>
          </View>
        )}

        {playerBalatas
          ? playerBalatas.map((balata, i) => {
              return (
                <View style={styles.balata} key={balata.id}>
                  <Balata
                    dots={balata.dots}
                    id={balata.id}
                    orientation="vertical"
                    longPressable
                    flippable
                    longPressed={this.onBalataChosen}
                    suddenFlip={this.state.flipAllBalatas}
                  />
                </View>
              );
            })
          : null}

        <View style={styles.flipBalataContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => this.flipOrUnflipAllBalatas("flip")}
          >
            <Text style={{ fontSize: 10 }}>Flip all</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => this.flipOrUnflipAllBalatas("unflip")}
          >
            <Text style={{ fontSize: 10 }}>Show all</Text>
          </TouchableOpacity>
        </View>
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
  spareBalataContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  spareButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cacaca",
    width: 60,
    height: 30
  },
  flipBalataContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  flipButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ca839b",
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
    whoseTurn: state.domino.whoseTurn
  };
};

const mapDispatchToProps = {
  onBalataChosen: dominoActions.onBalataChosen,
  toggleSpareBalatas: dominoActions.toggleSpareBalatas
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBalatasArranger);
