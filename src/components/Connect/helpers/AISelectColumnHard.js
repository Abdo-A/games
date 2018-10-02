//note, it is hard because it pays attention to both vertical coins and horizontal coins

export const AISelectColumnHard = gameState => {
  console.log("hi, I am AISELECTCOLUMN hard");

  let selectedColumnIndex;

  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      //first if horizontal (searching for identical horizontal threes)
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

      //first if vertical (searching for identical vertical threes)
      if (
        gameState[i] &&
        gameState[i + 1] &&
        gameState[i + 2] &&
        gameState[i][j] &&
        gameState[i + 1][j] &&
        gameState[i + 2][j]
      ) {
        if (
          gameState[i][j] == gameState[i + 1][j] &&
          gameState[i][j] == gameState[i + 2][j]
        ) {
          if (!gameState[i + 3][j] && i + 3 <= 10) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i - 1][j] && i - 1 <= 10) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }

      //second if horizontal (searching for identical horizontal twos)
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

      //second if vertical (searching for identical vertical twos)
      if (
        gameState[i] &&
        gameState[i + 1] &&
        gameState[i][j] &&
        gameState[i + 1][j]
      ) {
        if (gameState[i][j] == gameState[i + 1][j]) {
          if (!this.gameState[i + 2][j] && i + 2 <= 10) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i - 1][j] && i - 1 <= 10) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }

      //third if (searching for single ones horizontal)
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

      //third if (searching for single ones vertical)
      if (gameState[i] && gameState[i][j]) {
        if (gameState[i][j] == gameState[i + 1][j]) {
          if (!gameState[i + 1][j] && i + 1 <= 10) {
            selectedColumnIndex = i;
            return selectedColumnIndex;
          } else if (!gameState[i - 1][j] && i - 1 <= 10) {
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
