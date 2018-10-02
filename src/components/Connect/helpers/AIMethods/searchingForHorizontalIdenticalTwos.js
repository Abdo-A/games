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
          if (i + 2 <= 10 && i + 2 >= 0 && !gameState[i + 2][j]) {
            console.log("second horizontal 1");

            selectedColumnIndex = i + 2;
            return selectedColumnIndex;
          } else if (i - 1 <= 10 && i - 1 >= 0 && !gameState[i - 1][j]) {
            console.log("second horizontal 2");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
