export const searchingForDiagonalIdenticalThrees = gameState => {
  //diagonal ascending right
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (
        gameState[i] &&
        gameState[i + 1] &&
        gameState[i + 2] &&
        gameState[i + 3] &&
        gameState[i][j] &&
        gameState[i + 1][j + 1] &&
        gameState[i + 2][j + 2]
      ) {
        if (
          gameState[i][j] == gameState[i + 1][j + 1] &&
          gameState[i][j] == gameState[i + 2][j + 2]
        ) {
          if (
            j + 3 <= 5 &&
            !gameState[i + 3][j + 3] &&
            gameState[i + 3][j + 2]
          ) {
            console.log("diagonal ascending right threes");
            selectedColumnIndex = i + 3;
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
        gameState[i - 1][j + 1] &&
        gameState[i - 2][j + 2]
      ) {
        if (
          gameState[i][j] == gameState[i - 1][j + 1] &&
          gameState[i][j] == gameState[i - 2][j + 2]
        ) {
          if (
            j + 3 <= 5 &&
            !gameState[i - 3][j + 3] &&
            gameState[i - 3][j + 2]
          ) {
            console.log("diagonal ascending left threes");
            selectedColumnIndex = i - 3;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
