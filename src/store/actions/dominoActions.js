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
  allBalatas,
  whoseTurn
) => {
  if (whoseTurn === "player2") console.log("Computer led me to here!");
  let groundBalatasEdited = [...groundBalatas];
  let player1BalatasEdited = [...player1Balatas];
  let player2BalatasEdited = [...player2Balatas];
  let allBalatasEdited = [...allBalatas];
  let whoseTurnEdited = whoseTurn;

  let orientation;
  let pushOrUnshift;
  let successFlag = false;

  if (groundBalatasEdited.length === 0) {
    pushOrUnshift = "push";
    successFlag = true;

    orientation = "horizontalHeadToLeft";
  } else {
    if (whoseTurn === "player2") console.log("Computer led me to here 2");
    const firstDotsInGroundQueue =
      groundBalatasEdited[0].orientation === "horizontalHeadToLeft"
        ? groundBalatasEdited[0].dots[0]
        : groundBalatasEdited[0].dots[1];

    const lastDotsInGroundQueue =
      groundBalatasEdited[groundBalatasEdited.length - 1].orientation ===
      "horizontalHeadToLeft"
        ? groundBalatasEdited[groundBalatasEdited.length - 1].dots[1]
        : groundBalatasEdited[groundBalatasEdited.length - 1].dots[0];

    if (pressedBalata.dots[0] === firstDotsInGroundQueue) {
      orientation = "horizontalTailToLeft";
      pushOrUnshift = "unshift";
      successFlag = true;
    } else if (pressedBalata.dots[1] === firstDotsInGroundQueue) {
      orientation = "horizontalHeadToLeft";
      pushOrUnshift = "unshift";
      successFlag = true;
    } else if (pressedBalata.dots[0] === lastDotsInGroundQueue) {
      orientation = "horizontalHeadToLeft";
      pushOrUnshift = "push";
      successFlag = true;
    } else if (pressedBalata.dots[1] === lastDotsInGroundQueue) {
      orientation = "horizontalTailToLeft";
      pushOrUnshift = "push";
      successFlag = true;
    }
  }

  if (successFlag && pressedBalata.dots[0] === pressedBalata.dots[1]) {
    orientation = "vertical";
  }

  if (successFlag) {
    if (whoseTurn === "player2") console.log("Computer led me to here 3");

    [
      groundBalatasEdited,
      player1BalatasEdited,
      player2BalatasEdited,
      allBalatasEdited
    ] = this.addToGround(
      pressedBalata,
      groundBalatasEdited,
      player1BalatasEdited,
      player2BalatasEdited,
      allBalatasEdited,
      orientation,
      pushOrUnshift
    );

    whoseTurnEdited === "player1"
      ? (whoseTurnEdited = "player2")
      : (whoseTurnEdited = "player1");
  } else {
    alert("Can't be played");
  }

  if (whoseTurn === "player2")
    console.log("Computer led me to here 4", groundBalatasEdited);

  return {
    type: actionTypes.ON_BALATA_CHOSEN,
    groundBalatas: groundBalatasEdited,
    allBalatas: allBalatasEdited,
    player1Balatas: player1BalatasEdited,
    player2Balatas: player2BalatasEdited,
    whoseTurn: whoseTurnEdited
  };
};

// HELPER METHOD BEGIN
addToGround = (
  pressedBalata,
  groundBalatasEdited,
  player1BalatasEdited,
  player2BalatasEdited,
  allBalatasEdited,
  orientation,
  pushOrUnshift
) => {
  let index = player1BalatasEdited.findIndex(
    balata => balata.id == pressedBalata.id
  );
  if (index !== -1) {
    player1BalatasEdited.splice(index, 1);
  }

  index = player2BalatasEdited.findIndex(
    balata => balata.id == pressedBalata.id
  );
  if (index !== -1) {
    player2BalatasEdited.splice(index, 1);
  }

  pressedBalata.belongsTo = "ground";
  pressedBalata.orientation = orientation;

  if (pushOrUnshift === "push") {
    groundBalatasEdited.push(pressedBalata);
  } else {
    groundBalatasEdited.unshift(pressedBalata);
  }

  allBalatasEdited.map(balata => {
    if (balata.id === pressedBalata.id) {
      balata.belongsTo = "ground";
    }
    return balata;
  });

  return [
    groundBalatasEdited,
    player1BalatasEdited,
    player2BalatasEdited,
    allBalatasEdited
  ];
};
// HELPER METHOD END

//---------------------------------------------------------------------------

export const onSpareBalataChosen = (
  pressedBalata,
  spareBalatas,
  player1Balatas,
  player2Balatas,
  allBalatas,
  groundBalatas,
  whoseTurn
) => {
  let spareBalatasEdited = [...spareBalatas];
  let player1BalatasEdited = [...player1Balatas];
  let player2BalatasEdited = [...player2Balatas];
  let allBalatasEdited = [...allBalatas];

  let index = spareBalatasEdited.findIndex(
    balata => balata.id == pressedBalata.id
  );
  if (index !== -1) {
    spareBalatasEdited.splice(index, 1);
  }

  pressedBalata.belongsTo = whoseTurn;

  if (whoseTurn === "player1") {
    player1BalatasEdited.unshift(pressedBalata);
  } else if (whoseTurn === "player2") {
    player2BalatasEdited.unshift(pressedBalata);
  }

  allBalatasEdited.map(balata => {
    if (balata.id === pressedBalata.id) {
      balata.belongsTo = whoseTurn;
    }
    return balata;
  });

  return {
    type: actionTypes.ON_SPARE_BALATA_CHOSEN,
    spareBalatas: spareBalatasEdited,
    allBalatas: allBalatasEdited,
    player1Balatas: player1BalatasEdited,
    player2Balatas: player2BalatasEdited
  };
};

//---------------------------------------------------------------------------

export const toggleSpareBalatas = trueOrFalse => {
  return {
    type: actionTypes.TOGGLE_SPARE_BALATAS,
    trueOrFalse: trueOrFalse
  };
};

//---------------------------------------------------------------------------

export const onComputerTurn = (
  player1Balatas,
  computerBalatas,
  groundBalatas,
  allBalatas,
  spareBalatas,
  whoseTurn
) => dispatch => {
  const firstDotsInGroundQueue =
    groundBalatas[0].orientation === "horizontalHeadToLeft"
      ? groundBalatas[0].dots[0]
      : groundBalatas[0].dots[1];

  const lastDotsInGroundQueue =
    groundBalatas[groundBalatas.length - 1].orientation ===
    "horizontalHeadToLeft"
      ? groundBalatas[groundBalatas.length - 1].dots[1]
      : groundBalatas[groundBalatas.length - 1].dots[0];

  let chosenBalata = "none";

  for (let i = 0; i < computerBalatas.length; i++) {
    if (
      computerBalatas[i].dots[0] === firstDotsInGroundQueue ||
      computerBalatas[i].dots[1] === firstDotsInGroundQueue ||
      computerBalatas[i].dots[0] === lastDotsInGroundQueue ||
      computerBalatas[i].dots[1] === lastDotsInGroundQueue
    ) {
      chosenBalata = computerBalatas[i];
    }
  }

  if (chosenBalata !== "none") {
    setTimeout(() => {
      dispatch(
        onBalataChosen(
          chosenBalata,
          player1Balatas,
          computerBalatas,
          groundBalatas,
          allBalatas,
          whoseTurn
        )
      );
    }, 900);
    console.log("Chosen by computer ", chosenBalata);
  } else {
    if (spareBalatas.length >= 1) {
      dispatch(toggleSpareBalatas(true)); //400

      const chosenSpareBalata = spareBalatas[0];
      setTimeout(() => {
        dispatch(
          onSpareBalataChosen(
            chosenSpareBalata,
            spareBalatas,
            player1Balatas,
            computerBalatas,
            allBalatas,
            groundBalatas,
            whoseTurn
          )
        );
      }, 1000);
    } else {
      console.log("Computer lost");
    }
  }
};
