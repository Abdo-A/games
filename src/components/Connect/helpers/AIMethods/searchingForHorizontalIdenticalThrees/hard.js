export const searchingForHorizontalIdenticalThreesHard = gameState => {
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
            /* case 1: $$$_$ */ i + 3 <= 10 &&
            i + 3 >= 0 &&
            gameState[i + 3] &&
            !gameState[i + 3][j] &&
            gameState[i + 4] &&
            gameState[i + 4][j] === gameState[i][j]
          ) {
            console.log("horizontal threes 1");
            selectedColumnIndex = i + 3;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 2: $_$$$ */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j] &&
            gameState[i - 2] &&
            gameState[i - 2][j] === gameState[i][j]
          ) {
            console.log("horizontal threes 2");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 3: $$$__$ */ i + 3 <= 10 &&
            i + 3 >= 0 &&
            !gameState[i + 3][j] &&
            gameState[i + 5] &&
            gameState[i + 5][j] === gameState[i][j]
          ) {
            console.log("horizontal threes 3");
            selectedColumnIndex = i + 3;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 4: $__$$$ */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j] &&
            gameState[i - 3] &&
            gameState[i - 3][j] === gameState[i][j]
          ) {
            console.log("horizontal threes 4");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 5: $$$_ accessible*/ i + 3 <= 10 &&
            i + 3 >= 0 &&
            !gameState[i + 3][j] &&
            (j - 1 <= 5 && j - 1 >= 0)
              ? !!gameState[i + 3][j - 1]
              : true
          ) {
            console.log("horizontal threes 5");

            selectedColumnIndex = i + 3;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 6: _$$$ accessible */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j] &&
            (j - 1 <= 5 && j - 1 >= 0)
              ? !!gameState[i - 1][j - 1]
              : true
          ) {
            console.log("horizontal threes 6");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 7: $$$_ not accessible*/ i + 3 <= 10 &&
            i + 3 >= 0 &&
            !gameState[i + 3][j]
          ) {
            console.log("horizontal threes 7");

            selectedColumnIndex = i + 3;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

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
            /* case 8: _$$$ not accessible */ i - 1 <= 10 &&
            i - 1 >= 0 &&
            !gameState[i - 1][j]
          ) {
            console.log("horizontal threes 8");

            selectedColumnIndex = i - 1;
            return selectedColumnIndex;
          }
        }
      }
    }
  }

  return null;
};
