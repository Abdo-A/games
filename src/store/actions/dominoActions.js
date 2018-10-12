import * as actionTypes from "./actionTypes";

export const makeAllBalatasBelongToGround = balatas => {
  let groundBalatas = balatas.map(balata => {
    balata.belongsTo = "ground";
    return balata;
  });

  return {
    type: actionTypes.MAKE_ALL_BALATAS_BELONG_TO_GROUND,
    payload: groundBalatas
  };
};
