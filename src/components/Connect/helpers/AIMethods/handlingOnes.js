export const horizontalOne = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (gameState[i] && gameState[i][j]) {
        if (
          /* case 1: $_$ */ i + 1 <= 10 &&
          i + 1 >= 0 &&
          !gameState[i + 1][j] &&
          gameState[i + 2] &&
          gameState[i + 2][j] === gameState[i][j]
        ) {
          console.log("third horizontal 1");

          selectedColumnIndex = i + 1;
          return selectedColumnIndex;
        } else if (
          /* case 2: $_$ */ i - 1 <= 10 &&
          i - 1 >= 0 &&
          !gameState[i - 1][j] &&
          gameState[i - 2] &&
          gameState[i - 2][j] === gameState[i][j]
        ) {
          console.log("third horizontal 2");

          selectedColumnIndex = i - 1;
          return selectedColumnIndex;
        } else if (
          /* case 3: $__$ */ i + 1 <= 10 &&
          i + 1 >= 0 &&
          !gameState[i + 1][j] &&
          gameState[i + 3] &&
          gameState[i + 3][j] === gameState[i][j]
        ) {
          console.log("third horizontal 3");

          selectedColumnIndex = i + 1;
          return selectedColumnIndex;
        } else if (
          /* case 4: $__$ */ i - 1 <= 10 &&
          i - 1 >= 0 &&
          !gameState[i - 1][j] &&
          gameState[i - 3] &&
          gameState[i - 3][j] === gameState[i][j]
        ) {
          console.log("third horizontal 4");

          selectedColumnIndex = i - 1;
          return selectedColumnIndex;
        } else if (
          /* case 5: $ */ i + 1 <= 10 &&
          i + 1 >= 0 &&
          !gameState[i + 1][j]
        ) {
          console.log("third horizontal 5");

          selectedColumnIndex = i + 1;
          return selectedColumnIndex;
        } else if (
          /* case 5: $ */ i - 1 <= 10 &&
          i - 1 >= 0 &&
          !gameState[i - 1][j]
        ) {
          console.log("third horizontal 6");

          selectedColumnIndex = i - 1;
          return selectedColumnIndex;
        }
      }
    }
  }

  return null;
};

export const verticalOne = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
      if (gameState[i] && gameState[i][j]) {
        if (gameState[i][j]) {
          if (!gameState[i][j + 1] && j + 1 <= 5) {
            console.log("third vertical");

            selectedColumnIndex = i;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
