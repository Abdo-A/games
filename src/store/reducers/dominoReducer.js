import { initialBalatas } from "./helpers/initialBalatas";
import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  allBalatas: initialBalatas, //array of objects
  groundBalatas: [], //array of objects
  player1Balatas: [], //array of objects
  player2Balatas: [], //array of objects
  spareBalatas: [], //array of objects
  player1Identity: "person", //person,computer
  player2Identity: "computer", //person,computer
  whoseTurn: "player1", //player1, player2
  showSpareBalatas: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_RANDOM_INITIAL_BALATAS_FOR_PLAYERS:
      return {
        ...state,
        allBalatas: action.allBalatas,
        player1Balatas: action.player1Balatas,
        player2Balatas: action.player2Balatas,
        spareBalatas: action.spareBalatas
      };

    case actionTypes.ON_BALATA_CHOSEN:
      console.log(action.whoseTurn);
      return {
        ...state,
        allBalatas: action.allBalatas,
        groundBalatas: action.groundBalatas,
        player1Balatas: action.player1Balatas,
        player2Balatas: action.player2Balatas,
        whoseTurn: action.whoseTurn
      };

    case actionTypes.ON_SPARE_BALATA_CHOSEN:
      return {
        ...state,
        allBalatas: action.allBalatas,
        spareBalatas: action.spareBalatas,
        player1Balatas: action.player1Balatas,
        player2Balatas: action.player2Balatas
      };

    case actionTypes.TOGGLE_SPARE_BALATAS:
      return {
        ...state,
        showSpareBalatas: action.trueOrFalse
      };

    default:
      return state;
  }
};
