export const AISelectColumnEasy = gameState => {
  console.log("hi, I am AISELECTCOLUMN easy");
  const selectedColumnIndex =
    Math.floor(Math.random() * (10 /*max*/ - 0 /*min*/ + 1)) + 0 /*min*/;
  return selectedColumnIndex;
};
