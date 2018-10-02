export const searchingForHorizontalIdenticalThrees = gameState => {
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 5; j++) {
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
          if (
            /* case 1: $$$ */ i + 3 <= 10 &&
            i + 3 >= 0 &&
            !gameState[i + 3][j]
          ) {
            console.log("horizontal threes normal 1");

            selectedColumnIndex = i + 3;
            return selectedColumnIndex;
          } else if (
            /* case 2: $$$ */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j]
          ) {
            console.log("horizontal threes normal 2");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
