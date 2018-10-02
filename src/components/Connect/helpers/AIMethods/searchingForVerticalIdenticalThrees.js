export const searchingForVerticalIdenticalThrees = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (
        gameState[i] &&
        gameState[i][j] &&
        gameState[i][j + 1] &&
        gameState[i][j + 2]
      ) {
        if (
          gameState[i][j] == gameState[i][j + 1] &&
          gameState[i][j] == gameState[i][j + 2]
        ) {
          if (!gameState[i][j + 3] && j + 3 <= 5) {
            console.log("vertical threes");
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
