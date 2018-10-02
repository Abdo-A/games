import { horizontalOne, verticalOne } from "./AIMethods/handlingOnes";
import { searchingForHorizontalIdenticalThrees } from "./AIMethods/searchingForHorizontalIdenticalThrees";
import { searchingForHorizontalIdenticalTwos } from "./AIMethods/searchingForHorizontalIdenticalTwos";
import { searchingForVerticalIdenticalThrees } from "./AIMethods/searchingForVerticalIdenticalThrees";
import { searchingForVerticalIdenticalTwos } from "./AIMethods/searchingForVerticalIdenticalTwos";

//note, it is hard because it pays attention to both vertical coins and horizontal coins

export const AISelectColumnHard = gameState => {
  console.log("hi, I am AISELECTCOLUMN hard");

  //declaring main returned variable
  let selectedColumnIndex;

  //random boolean
  const checkHorizontalFirst = Math.random() >= 0.5;
  const checkVerticalFirst = !checkHorizontalFirst;

  if (checkHorizontalFirst) {
    selectedColumnIndex = searchingForHorizontalIdenticalThrees(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForVerticalIdenticalThrees(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForHorizontalIdenticalTwos(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForVerticalIdenticalTwos(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = horizontalOne(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = verticalOne(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }
  }

  if (checkVerticalFirst) {
    selectedColumnIndex = searchingForVerticalIdenticalThrees(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForHorizontalIdenticalThrees(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForVerticalIdenticalTwos(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForHorizontalIdenticalTwos(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = verticalOne(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = horizontalOne(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }
  }

  //last case, random
  selectedColumnIndex =
    Math.floor(Math.random() * (10 /*max*/ - 0 /*min*/ + 1)) + 0 /*min*/;
  return selectedColumnIndex;
};
