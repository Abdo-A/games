//note, it is medium because it doesn't pay attention to vertical coins, only pays attention to horizontal ones

export const AISelectColumnMedium = gameState => {
  console.log("hi, I am AISELECTCOLUMN medium");

  let selectedColumnIndex;

  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      //first if (searching for identical horizontal threes)
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
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i][j - 1] && j - 1 <= 5) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }

      //second if (searching for identical horizontal twos)
      if (gameState[i] && gameState[i][j] && gameState[i][j + 1]) {
        if (gameState[i][j] == gameState[i][j + 1]) {
          if (!this.gameState[i][j + 2] && j + 2 <= 5) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i][j - 1] && j - 1 <= 5) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }

      //third if (searching for single ones)
      if (gameState[i] && gameState[i][j]) {
        if (gameState[i][j]) {
          if (!gameState[i][j + 1] && j + 1 <= 5) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i][j - 1] && j - 1 <= 5) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  //last case, random
  selectedColumnIndex =
    Math.floor(Math.random() * (10 /*max*/ - 0 /*min*/ + 1)) + 0 /*min*/;
  return selectedColumnIndex;
};
