const errors = {
  0: "",
  101: "Error 101: please create grid",
  102: "Error 102: grid indexes must be between 1 and size of grid",
  1031: "Error 1031: must have one index=1 per index line",
  1032: "Error 1032: must have only one index=1 per index line",
  104: "Error 104: must have only one index=gridSize per index line",
  105: "Error 105: if index=1 in corner => adjacent corner must =1",
  106: "Error 106: if index=4 => opposite index must = 1",
  107: "Error 107: if index=1 => opposite index mustnot = 1",
  201: "Error 201: inconsistent indexes 1-4",
  301: "Error 301: No solution",
};

displayError = (error) => {
  $("#errors").text(errors[error]);
};
// left = 0
// top = 1
// right = 2
// bottom = 3
