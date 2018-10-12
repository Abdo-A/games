import { initialBalatas } from "./helpers/initialBalatas";
import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  balatas: initialBalatas, //array of objects
  groundBalatas: null, //array of objects
  player1Balatas: null, //array of objects
  player2Balatas: null, //array of objects
  player1: "person", //person,computer
  player2: "computer", //person,computer
  draggedBalata: null, //object
  firstBalataInGround: null, //object
  lastBalataInGround: null //object
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MAKE_ALL_BALATAS_BELONG_TO_GROUND:
      return {
        ...state,
        balatas: action.payload
      };
    default:
      return state;
  }
};
