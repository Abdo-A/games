export const searchingForHorizontalIdenticalTwos = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (
        gameState[i] &&
        gameState[i + 1] &&
        gameState[i][j] &&
        gameState[i + 1][j]
      ) {
        if (gameState[i][j] == gameState[i + 1][j]) {
          if (
            /* case 1: $$_$ */
            i + 2 <= 10 &&
            i + 2 >= 0 &&
            !gameState[i + 2][j] &&
            gameState[i + 3] &&
            gameState[i + 3][j] === gameState[i][j]
          ) {
            console.log("horizontal twos 1");

            selectedColumnIndex = i + 2;
            return selectedColumnIndex;
          } else if (
            /* case 2: $_$$ */
            i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j] &&
            gameState[i - 2] &&
            gameState[i - 2][j] === gameState[i][j]
          ) {
            console.log("horizontal twos 2");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          } else if (
            /* case 1: $$__$ */
            i + 2 <= 10 &&
            i + 2 >= 0 &&
            !gameState[i + 2][j] &&
            gameState[i + 4] &&
            gameState[i + 4][j] === gameState[i][j]
          ) {
            console.log("horizontal twos 3");

            selectedColumnIndex = i + 2;
            return selectedColumnIndex;
          } else if (
            /* case 2: $__$$ */
            i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j] &&
            gameState[i - 3] &&
            gameState[i - 3][j] === gameState[i][j]
          ) {
            console.log("horizontal twos 4");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          } else if (
            /* case 5: $$$ */ i + 2 <= 10 &&
            i + 2 >= 0 &&
            !gameState[i + 2][j]
          ) {
            console.log("horizontal twos 5");

            selectedColumnIndex = i + 2;
            return selectedColumnIndex;
          } else if (
            /* case 5: $$$ */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j]
          ) {
            console.log("horizontal twos 6");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
