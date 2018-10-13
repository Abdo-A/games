import * as actionTypes from "./actionTypes";

//---------------------------------------------------------------------------

export const setRandomFirstGroundBalata = allBalatas => {
  let randomId = Math.floor(Math.random() * (28 - 0) + 0); //0 inclusive and 28 exclusive

  let allBalatasEdited = [...allBalatas];
  let randomIndex = allBalatasEdited.findIndex(balata => balata.id == randomId);

  allBalatasEdited[randomIndex].belongsTo = "ground";

  const groundBalatas = [allBalatasEdited[randomIndex]];

  return {
    type: actionTypes.SET_RANDOM_FIRST_GROUND_BALATA,
    allBalatas: allBalatasEdited,
    groundBalatas: groundBalatas
  };
};

//---------------------------------------------------------------------------

export const setRandomInitialBalatasForPlayers = allBalatas => {
  let allBalatasEdited = [...allBalatas];
  let player1Balatas = [];
  let player2Balatas = [];

  let counter1 = 0,
    counter2 = 0;

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

  return {
    type: actionTypes.SET_RANDOM_INITIAL_BALATAS_FOR_PLAYERS,
    allBalatas: allBalatasEdited,
    player1Balatas: player1Balatas,
    player2Balatas: player2Balatas
  };
};

//---------------------------------------------------------------------------

export const onBalataClicked = (
  clickedBalata,
  player1Balatas,
  player2Balatas,
  groundBalatas,
  allBalatas
) => {
  console.log(clickedBalata, " is clicked!");

  return {
    type: actionTypes.ON_BALATA_CLICKED,
    groundBalatas: groundBalatas, //"groundBalatasEdited"
    allBalatas: allBalatas, //"allBalatasEdited"
    player1Balatas: player1Balatas,
    player2Balatas: player2Balatas
  };
};
