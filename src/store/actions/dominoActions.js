import * as actionTypes from "./actionTypes";

//---------------------------------------------------------------------------

export const setRandomInitialBalatasForPlayers = allBalatas => {
  let allBalatasEdited = [...allBalatas];
  let player1Balatas = [];
  let player2Balatas = [];
  let spareBalatas = [];

  //for player1
  let counter1 = 0;

  while (counter1 < 7) {
    let randomId = Math.floor(Math.random() * (28 - 0) + 0); //0 inclusive and 28 exclusive

    let randomIndex = allBalatasEdited.findIndex(
      balata => balata.id == randomId
    );
    if (allBalatasEdited[randomIndex].belongsTo == "spare" && counter1 < 7) {
      allBalatasEdited[randomIndex].belongsTo = "player1";
      player1Balatas.push(allBalatasEdited[randomIndex]);
      counter1++;
    }
  }

  //for player2
  let counter2 = 0;

  while (counter2 < 7) {
    let randomId = Math.floor(Math.random() * (28 - 0) + 0); //0 inclusive and 28 exclusive

    let randomIndex = allBalatasEdited.findIndex(
      balata => balata.id == randomId
    );

    if (allBalatasEdited[randomIndex].belongsTo == "spare" && counter2 < 7) {
      allBalatasEdited[randomIndex].belongsTo = "player2";
      player2Balatas.push(allBalatasEdited[randomIndex]);
      counter2++;
    }
  }

  //for spare
  let counter3 = 0;

  while (counter3 < 13) {
    let randomId = Math.floor(Math.random() * (28 - 0) + 0); //0 inclusive and 28 exclusive

    let randomIndex = allBalatasEdited.findIndex(
      balata => balata.id == randomId
    );

    if (allBalatasEdited[randomIndex].belongsTo == "spare" && counter3 < 13) {
      let index = spareBalatas.findIndex(
        balata => balata.id == allBalatasEdited[randomIndex].id
      );
      if (index === -1) {
        spareBalatas.push(allBalatasEdited[randomIndex]);
        counter3++;
      }
    }
  }

  return {
    type: actionTypes.SET_RANDOM_INITIAL_BALATAS_FOR_PLAYERS,
    allBalatas: allBalatasEdited,
    player1Balatas: player1Balatas,
    player2Balatas: player2Balatas,
    spareBalatas: spareBalatas
  };
};

//---------------------------------------------------------------------------

export const onBalataChosen = (
  pressedBalata,
  player1Balatas,
  player2Balatas,
  groundBalatas,
  allBalatas
) => {
  console.log(pressedBalata, " is pressed!");

  return {
    type: actionTypes.ON_BALATA_CHOSEN,
    groundBalatas: groundBalatas, //"groundBalatasEdited"
    allBalatas: allBalatas, //"allBalatasEdited"
    player1Balatas: player1Balatas,
    player2Balatas: player2Balatas
  };
};
