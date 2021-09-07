let indexes;
// left = 0
// top = 1
// right = 2
// bottom = 3
initIndexes = () => {
  // left/top/right/bottm
  indexes = new Array(4);
  for (let i = 0; i < indexes.length; i++) {
    indexes[i] = new Array(gridSize);
    indexes[i].fill(0);
  }

  // fill left
  let left = [];
  for (let i = 0; i < gridSize; i++) {
    let val = $("#index-" + (i + 1) + "-0 input").val();
    left.push(Number(val));
  }
  indexes[0] = left;

  //fill top
  let top = [];
  for (let i = 0; i < gridSize; i++) {
    let val = $("#index-0-" + (i + 1) + " input").val();
    top.push(Number(val));
  }
  indexes[1] = top;

  //fill right
  let right = [];
  for (let i = 0; i < gridSize; i++) {
    let val = $(
      "#index-" + (i + 1) + "-" + (Number(gridSize) + 1) + " input"
    ).val();
    right.push(Number(val));
  }
  indexes[2] = right;

  //fill bottom
  let bottom = [];
  for (let i = 0; i < gridSize; i++) {
    let val = $(
      "#index-" + (Number(gridSize) + 1) + "-" + (i + 1) + " input"
    ).val();
    bottom.push(Number(val));
  }
  indexes[3] = bottom;

  // error chercking ------------

  let result = checkIndexes();

  if (result == 0) {
    result = checkIndexesNum1();
  }
  if (result == 0) {
    result = checkIndexesNum4();
  }
  if (result == 0) {
    result = checkIndexesCorners1();
  }
  if (result == 0) {
    result = checkIndexesNum41();
  }
  if (result == 0) {
    result = checkIndexesNum11();
  }

  displayError(result);

  return result;
};

checkIndexes = () => {
  let result = 0;
  result = checkIndexesRange();
  return result;
};

checkIndexesRange = () => {
  for (let i = 0; i < indexes.length; i++) {
    let temp = indexes[i];
    for (let u = 0; u < temp.length; u++) {
      if (isNaN(temp[u])) return 101;
      if (temp[u] < 1 || temp[u] > gridSize) return 102;
    }
  }
  return 0;
};

checkIndexesNum1 = () => {
  for (let i = 0; i < indexes.length; i++) {
    let result = 0;
    let el = indexes[i];
    for (let u = 0; u < el.length; u++) {
      if (el[u] == 1) result++;
    }
    if (result == 0) {
      return 1031;
    }
    if (result > 1) {
      return 1032;
    }
  }
  return 0;
};
checkIndexesNum4 = () => {
  for (let i = 0; i < indexes.length; i++) {
    let result = 0;
    let el = indexes[i];
    for (let u = 0; u < el.length; u++) {
      if (el[u] == 4) result++;
    }
    if (result > 1) {
      return 104;
    }
  }
  return 0;
};

checkIndexesCorners1 = () => {
  let max = gridSize - 1;
  //left-bottom
  if (indexes[0][max] == 1 && indexes[3][0] != 1) return 105;
  //left-top
  if (indexes[0][0] == 1 && indexes[1][0] != 1) return 105;
  //top-left
  if (indexes[1][0] == 1 && indexes[0][0] != 1) return 105;
  //top-right
  if (indexes[1][max] == 1 && indexes[2][0] != 1) return 105;
  //right-top
  if (indexes[2][0] == 1 && indexes[1][max] != 1) return 105;
  //right-bottom
  if (indexes[2][max] == 1 && indexes[3][max] != 1) return 105;
  //bottom-right
  if (indexes[3][max] == 1 && indexes[2][max] != 1) return 105;
  //bottom-left
  if (indexes[3][0] == 1 && indexes[0][max] != 1) return 105;

  return 0;
};

checkIndexesNum41 = () => {
  for (let i = 0; i < gridSize; i++) {
    //row left
    if (indexes[0][i] == 4 && indexes[2][i] != 1) return 106;
    //row right
    if (indexes[2][i] == 4 && indexes[0][i] != 1) return 106;
    //col top
    if (indexes[1][i] == 4 && indexes[3][i] != 1) return 106;
    //col bottom
    if (indexes[3][i] == 4 && indexes[1][i] != 1) return 106;
  }
  return 0;
};

checkIndexesNum11 = () => {
  for (let i = 0; i < gridSize; i++) {
    //row left
    if (indexes[0][i] == 1 && indexes[2][i] == 1) return 107;
    //row right
    if (indexes[2][i] == 1 && indexes[0][i] == 1) return 107;
    //col top
    if (indexes[1][i] == 1 && indexes[3][i] == 1) return 107;
    //col bottom
    if (indexes[3][i] == 1 && indexes[1][i] == 1) return 107;
  }
  return 0;
};
