export const searchingForVerticalIdenticalTwos = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (gameState[i] && gameState[i][j] && gameState[i][j + 1]) {
        if (gameState[i][j] == gameState[i][j + 1]) {
          if (!gameState[i][j + 2] && j + 2 <= 5) {
            console.log("second vertical");

            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
