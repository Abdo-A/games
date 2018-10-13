import { initialBalatas } from "./helpers/initialBalatas";
import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  allBalatas: initialBalatas, //array of objects
  groundBalatas: [], //array of objects
  player1Balatas: [], //array of objects
  player2Balatas: [], //array of objects
  player1: "person", //person,computer
  player2: "computer", //person,computer,
  draggedBalata: {
    id: null,
    dots: [],
    X: null,
    Y: null
  }, //object
  firstGroundBalata: {
    id: null,
    dots: [],
    X: null,
    Y: null
  }, //object
  lastGroundBalata: {
    id: null,
    dots: [],
    X: null,
    Y: null
  } //object
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_RANDOM_FIRST_GROUND_BALATA:
      return {
        ...state,
        allBalatas: action.allBalatas,
        groundBalatas: action.groundBalatas
      };

    case actionTypes.SET_RANDOM_INITIAL_BALATAS_FOR_PLAYERS:
      return {
        ...state,
        allBalatas: action.allBalatas,
        player1Balatas: action.player1Balatas,
        player2Balatas: action.player2Balatas
      };

    case actionTypes.SET_FIRST_GROUND_BALATA:
      console.log("FIRST", action.balata);
      return {
        ...state,
        firstGroundBalata: action.balata
      };

    case actionTypes.SET_LAST_GROUND_BALATA:
      console.log("LAST", action.balata);
      return {
        ...state,
        lastGroundBalata: action.balata
      };

    case actionTypes.SET_DRAGGED_BALATA:
      return {
        ...state,
        draggedBalata: action.balata
      };

    case actionTypes.ON_DRAGGED_BALATA_RELEASE:
      return {
        ...state,
        allBalatas: action.allBalatas,
        groundBalatas: action.groundBalatas
      };

    default:
      return state;
  }
};
