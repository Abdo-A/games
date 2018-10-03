import { horizontalOne, verticalOne } from "./AIMethods/handlingOnes";
import { searchingForHorizontalIdenticalThreesHard } from "./AIMethods/searchingForHorizontalIdenticalThrees/hard";
import { searchingForHorizontalIdenticalTwosHard } from "./AIMethods/searchingForHorizontalIdenticalTwos/hard";
import { searchingForVerticalIdenticalThrees } from "./AIMethods/searchingForVerticalIdenticalThrees";
import { searchingForVerticalIdenticalTwos } from "./AIMethods/searchingForVerticalIdenticalTwos";

export const AISelectColumnHard = gameState => {
  console.log("hi, I am AISELECTCOLUMN hard");

  //declaring main returned variable
  let selectedColumnIndex;

  //random boolean
  const checkHorizontalFirst = Math.random() >= 0.5;
  const checkVerticalFirst = !checkHorizontalFirst;

  if (checkHorizontalFirst) {
    selectedColumnIndex = searchingForHorizontalIdenticalThreesHard(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForVerticalIdenticalThrees(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForHorizontalIdenticalTwosHard(gameState);
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

    selectedColumnIndex = searchingForHorizontalIdenticalThreesHard(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForVerticalIdenticalTwos(gameState);
    if (selectedColumnIndex !== null) {
      return selectedColumnIndex;
    }

    selectedColumnIndex = searchingForHorizontalIdenticalTwosHard(gameState);
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

  //last case, random
  selectedColumnIndex =
    Math.floor(Math.random() * (10 /*max*/ - 0 /*min*/ + 1)) + 0 /*min*/;
  return selectedColumnIndex;
};
