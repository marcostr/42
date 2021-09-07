let grid = [];

displayGrid = (size) => {
  let $grid = $("#grid");
  $grid.empty();
  //set Rows

  for (let i = 0; i < size + 2; i++) {
    let $row = $("<div class='row' id='row-" + i + "'></div>");
    $grid.append($row);
  }
  //set
  //top
  for (let i = 0; i < size + 2; i++) {
    let $ind = $(
      "<div class='index' id='index-0-" +
        i +
        "'> <input type='number' min='1' max='" +
        size +
        "'/></div>"
    );
    $("#row-0").append($ind);
  }

  //center
  for (let i = 1; i < size + 1; i++) {
    let $ind = $(
      "<div class='index' id='index-" +
        i +
        "-" +
        0 +
        "'><input type='number' min='1' max='" +
        size +
        "'/></div>"
    );
    $("#row-" + i + "").append($ind);
    for (let u = 1; u < size + 1; u++) {
      let $cell = $("<div class='cell' id='cell-" + i + "-" + u + "'></div>");
      $("#row-" + i + "").append($cell);
    }
    $ind = $(
      "<div class='index' id='index-" +
        i +
        "-" +
        (size + 1) +
        "'><input type='number' min='1' max='" +
        size +
        "'/></div>"
    );
    $("#row-" + i + "").append($ind);
  }

  //bottom
  for (let i = 0; i < size + 2; i++) {
    let $ind = $(
      "<div class='index' id='index-" +
        (size + 1) +
        "-" +
        i +
        "'><input type='number' min='1' max='" +
        size +
        "'/></div>"
    );
    $("#row-" + (size + 1) + "").append($ind);
  }

  //remove corners
  //top-left
  temp = "#index-0-0";
  $(temp).addClass("corner");
  $(temp + " input").remove();
  //top-right
  temp = "#index-0-" + (size + 1) + "";
  $(temp).addClass("corner");
  $(temp + "  input").remove();
  //bottom-left
  temp = "#index-" + (size + 1) + "-0";
  $(temp).addClass("corner");
  $(temp + "  input").remove();
  //bottom-right
  temp = "#index-" + (size + 1) + "-" + (size + 1) + "";
  $(temp).addClass("corner");
  $(temp + "  input").remove();

  displayError(0);
};
