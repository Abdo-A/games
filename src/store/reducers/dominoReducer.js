import { initialBalatas } from "./helpers/initialBalatas";
import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  allBalatas: initialBalatas, //array of objects
  groundBalatas: [], //array of objects
  player1Balatas: [], //array of objects
  player2Balatas: [], //array of objects
  player1Score: 0,
  player2Score: 0,
  spareBalatas: [], //array of objects
  player1Identity: "person", //person,computer
  player2Identity: null, //person,computer
  whoseTurn: "player1", //player1, player2
  showSpareBalatas: false,
  awaitingChoosingOpponent: true,
  winner: null //player1, player2
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_RANDOM_INITIAL_BALATAS_FOR_PLAYERS:
      return {
        ...state,
        allBalatas: action.allBalatas,
        player1Balatas: action.player1Balatas,
        player2Balatas: action.player2Balatas,
        spareBalatas: action.spareBalatas,
        winner: null
      };

    case actionTypes.ON_BALATA_CHOSEN:
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

    case actionTypes.ON_DECIDE_OPPONENT:
      return {
        ...state,
        player2Identity: action.opponent,
        awaitingChoosingOpponent: false
      };

    case actionTypes.SET_WINNER:
      return {
        ...state,
        winner: action.winner
      };

    case actionTypes.RESET_GAME_AND_PLAY:
      return {
        ...INITIAL_STATE,
        player1Score: action.player1Score,
        player2Score: action.player2Score,
        winner: null,
        whoseTurn: action.whoseTurn
      };

    case actionTypes.QUIT_GAME:
      console.log("game quit");
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};
