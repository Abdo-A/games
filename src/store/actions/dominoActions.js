import * as actionTypes from "./actionTypes";

//---------------------------------------------------------------------------

export const setRandomInitialBalatasForPlayers = allBalatas => {
  let allBalatasEdited = [...allBalatas];

  // for (let balata of allBalatasEdited) {
  //   balata.belongsTo = "spare";
  // }

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

  //if (whoseTurn === "player2")
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
  whoseTurn,
  hint
) => dispatch => {
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

  dispatch({
    type: actionTypes.ON_SPARE_BALATA_CHOSEN,
    spareBalatas: spareBalatasEdited,
    allBalatas: allBalatasEdited,
    player1Balatas: player1BalatasEdited,
    player2Balatas: player2BalatasEdited
  });

  if (hint === "computerShouldPlayAfterChoosingaSpare") {
    setTimeout(() => {
      dispatch(
        onComputerTurn(
          player1BalatasEdited,
          player2BalatasEdited,
          groundBalatas,
          allBalatasEdited,
          spareBalatasEdited,
          whoseTurn
        )
      );
    }, 1000);
  }
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
    dispatch(toggleSpareBalatas(false));
  } else {
    if (spareBalatas.length >= 1) {
      setTimeout(() => {
        dispatch(toggleSpareBalatas(true));
      }, 400);

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
            whoseTurn,
            "computerShouldPlayAfterChoosingaSpare"
          )
        );
      }, 1400);
    } else {
      console.log("Computer lost");
    }
  }
};

//---------------------------------------------------------------------------

export const onDecideOpponent = opponent => {
  return {
    type: actionTypes.ON_DECIDE_OPPONENT,
    opponent: opponent
  };
};

//---------------------------------------------------------------------------

export const checkWinner = () => (dispatch, getState) => {
  const state = getState().domino;

  let winner = null;

  let timeoutToAnnounceWinner = 2000;

  const firstDotsInGroundQueue =
    state.groundBalatas[0].orientation === "horizontalHeadToLeft"
      ? state.groundBalatas[0].dots[0]
      : state.groundBalatas[0].dots[1];

  const lastDotsInGroundQueue =
    state.groundBalatas[state.groundBalatas.length - 1].orientation ===
    "horizontalHeadToLeft"
      ? state.groundBalatas[state.groundBalatas.length - 1].dots[1]
      : state.groundBalatas[state.groundBalatas.length - 1].dots[0];

  if (state.player1Balatas.length === 0) {
    winner = "player1";
  } else if (state.player2Balatas.length === 0) {
    winner = "player2";
  } else if (state.spareBalatas.length === 0) {
    timeoutToAnnounceWinner = 5000;

    let player1Loses = true;
    let player2Loses = true;

    for (let balata of state.player1Balatas) {
      if (
        balata.dots[0] === firstDotsInGroundQueue ||
        balata.dots[1] === lastDotsInGroundQueue
      ) {
        player1Loses = false;
      }
    }

    for (let balata of state.player2Balatas) {
      if (
        balata.dots[0] === firstDotsInGroundQueue ||
        balata.dots[1] === lastDotsInGroundQueue
      ) {
        player2Loses = false;
      }
    }

    if (player1Loses) {
      winner = "player2";
    } else if (player2Loses) {
      winner = "player1";
    }
  }

  if (winner) {
    setTimeout(() => {
      dispatch(setWinner(winner));
    }, timeoutToAnnounceWinner);
  }
};

//---------------------------------------------------------------------------

const setWinner = winner => {
  return {
    type: actionTypes.SET_WINNER,
    winner: winner
  };
};

//---------------------------------------------------------------------------

export const resetGameAndPlay = () => (dispatch, getState) => {
  const state = { ...getState().domino };

  let player1Score = state.player1Score;
  let player2Score = state.player2Score;

  let winner = state.winner;

  let scoreSum = 0;

  if (winner === "player1") {
    for (let balata of state.player2Balatas) {
      scoreSum += balata.dots[0];
      scoreSum += balata.dots[1];
    }
    player1Score += scoreSum;
  }

  if (winner === "player2") {
    for (let balata of state.player1Balatas) {
      scoreSum += balata.dots[0];
      scoreSum += balata.dots[1];
    }
    player2Score += scoreSum;
  }

  dispatch(setRandomInitialBalatasForPlayers(state.allBalatas));

  dispatch({
    type: actionTypes.RESET_GAME_AND_PLAY,
    player1Score: player1Score,
    player2Score: player2Score,
    whoseTurn: winner
  });
};

//---------------------------------------------------------------------------

export const quitGame = () => {
  return {
    type: actionTypes.QUIT_GAME
  };
};
