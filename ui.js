uiInit = () => {
  $("#start").submit((e) => {
    e.preventDefault();
    gridSize = $("#gridSize").val();
    displayGrid(Number(gridSize));
  });

  $("#go").on("click", () => {
    gridSize = Number($("#gridSize").val());
    let res = initIndexes();
    if (res == 0) resolve();
  });
};
