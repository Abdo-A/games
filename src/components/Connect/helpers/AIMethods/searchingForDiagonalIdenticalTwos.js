export const searchingForDiagonalIdenticalTwos = gameState => {
  //diagonal ascending right
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (
        gameState[i] &&
        gameState[i + 1] &&
        gameState[i + 2] &&
        gameState[i + 3] &&
        gameState[i][j] &&
        gameState[i + 1][j + 1]
      ) {
        if (gameState[i][j] == gameState[i + 1][j + 1]) {
          if (
            j + 3 <= 5 &&
            !gameState[i + 2][j + 2] &&
            gameState[i + 2][j + 1]
          ) {
            console.log("diagonal ascending right twos");
            selectedColumnIndex = i + 2;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  //diagonal ascending left
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (
        gameState[i] &&
        gameState[i - 1] &&
        gameState[i - 2] &&
        gameState[i - 3] &&
        gameState[i][j] &&
        gameState[i - 1][j + 1]
      ) {
        if (gameState[i][j] == gameState[i - 1][j + 1]) {
          if (
            j + 3 <= 5 &&
            !gameState[i - 2][j + 2] &&
            gameState[i - 2][j + 1]
          ) {
            console.log("diagonal ascending left twos");
            selectedColumnIndex = i - 2;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
