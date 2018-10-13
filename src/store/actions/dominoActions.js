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
    type: actionTypes.SET_RANDOM_FIRST_GROUND_BALATA,
    allBalatas: allBalatasEdited,
    player1Balatas: player1Balatas,
    player2Balatas: player2Balatas
  };
};

//---------------------------------------------------------------------------

export const setFirstGroundBalata = balata => {
  return {
    type: actionTypes.SET_FIRST_GROUND_BALATA,
    balata: balata
  };
};

//---------------------------------------------------------------------------

export const setLastGroundBalata = balata => {
  return {
    type: actionTypes.SET_LAST_GROUND_BALATA,
    balata: balata
  };
};

//---------------------------------------------------------------------------

export const setDraggedBalata = balata => {
  return {
    type: actionTypes.SET_DRAGGED_BALATA,
    balata: balata
  };
};

//---------------------------------------------------------------------------

export const onDraggedBalataRelease = (
  draggedBalata,
  firstBalata,
  lastBalata,
  groundBalatas,
  allBalatas
) => {
  console.log("drag is released");

  if (
    draggedBalata &&
    ((Math.abs(draggedBalata.X - firstBalata.X) < 50 &&
      Math.abs(draggedBalata.Y - firstBalata.Y) < 20) ||
      (Math.abs(draggedBalata.X - lastBalata.X) < 50 &&
        Math.abs(draggedBalata.Y - lastBalata.Y) < 20))
  ) {
    console.log("It is near!");

    //...decide whether or not it should be added to ground balatas
  } else {
    return { type: null };
  }

  return {
    type: actionTypes.ON_DRAGGED_BALATA_RELEASE,
    groundBalatas: groundBalatas, //"groundBalatasEdited"
    allBalatas: allBalatas //"allBalatasEdited"
  };
};
