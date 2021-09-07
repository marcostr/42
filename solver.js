let matrix;
resolve = () => {
  //console.log("resolving");

  initMatrix();
  //console.log("matrix1 = ");
  //console.log(matrix);

  let error = fillMatrixFromIndexes();

  //launch brute force solver
  if (error == 0) {
    let ps = solver();
    displayFirstResult(ps);
    console.log("solver = ");
    console.log(ps);
  }
  console.log("matrix2 = ");
  console.log(matrix);
  displayError(error);
};

initMatrix = () => {
  matrix = new Array(gridSize);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(gridSize);
    matrix[i].fill(0);
  }
};

displayFirstResult = (result) => {
  for (let i = 0; i < gridSize; i++) {
    let line = result[i];
    for (let u = 0; u < line.length; u++) {
      $("#cell-" + (i + 1) + "-" + (u + 1) + "").text(line[u]);
    }
  }
};

fillMatrixFromIndexes = () => {
  fillMatrixFrom1();
  return fillMatrixFrom4();
};

fillMatrixFrom1 = () => {
  let max = gridSize - 1;
  for (let i = 0; i < gridSize; i++) {
    //left
    if (indexes[0][i] == 1) matrix[i][0] = gridSize;
    //top
    if (indexes[1][i] == 1) matrix[0][i] = gridSize;
    //right
    if (indexes[2][i] == 1) matrix[i][max] = gridSize;
    //bottom
    if (indexes[3][i] == 1) matrix[max][i] = gridSize;
  }
};

fillMatrixFrom4 = () => {
  for (let i = 0; i < gridSize; i++) {
    //left
    if (indexes[0][i] == 4) {
      for (let u = 0; u < gridSize; u++) {
        let val = u + 1;
        let cell = matrix[i][u];
        if (cell == 0 || cell == val) {
          matrix[i][u] = val;
        } else {
          return 201;
        }
      }
    }
    //top
    if (indexes[1][i] == gridSize) {
      for (let u = 0; u < gridSize; u++) {
        let val = u + 1;
        let cell = matrix[u][i];
        if (cell == 0 || cell == val) {
          matrix[u][i] = val;
        } else {
          return 201;
        }
      }
    }
    //right
    if (indexes[2][i] == gridSize) {
      for (let u = 0; u < gridSize; u++) {
        let val = gridSize - u;
        let cell = matrix[i][u];
        if (cell == 0 || cell == val) {
          matrix[i][u] = val;
        } else {
          return 201;
        }
      }
    }
    //bottom
    if (indexes[3][i] == gridSize) {
      for (let u = 0; u < gridSize; u++) {
        let val = gridSize - u;
        let cell = matrix[u][i];
        if (cell == 0 || cell == val) {
          matrix[u][i] = val;
        } else {
          return 201;
        }
      }
    }
  }
  return 0;
};

solver = () => {
  console.log("brute force solver init");

  //get all possible lines
  let all = setLine();
  console.log("all = ");
  console.log(all);
  //get all possible lines with indexes
  let possibleLines = new Array(gridSize);
  //init lines groups
  for (let i = 0; i < possibleLines.length; i++) {
    possibleLines[i] = [];
  }
  //check per matrix line
  for (let u = 0; u < gridSize; u++) {
    let indexLeft = indexes[0][u];
    let indexRight = indexes[2][u];
    //get all solutions with required numbers
    let temp = keepRequiredValues(all, matrix[u]);
    //browse temp result to match indexes
    for (let i = 0; i < temp.length; i++) {
      let ind = getIndexesFromLine(temp[i]);
      if (ind[0] == indexLeft && ind[1] == indexRight) {
        possibleLines[u].push(temp[i]);
      }
    }
  }
  console.log("possibleLines = ");
  console.log(possibleLines);

  let resTest = [];
  let sol = [];
  getSolution(possibleLines, 0, resTest, sol);
  console.log("getSolution = ");
  console.log(sol);

  let m = sortSolution(sol);

  console.log("end");
  console.log(m);

  return m;
};

sortSolution = (solutions) => {
  for (let i = 0; i < solutions.length; i++) {
    let columns = lineToCol(solutions[i]);
    let isOk = true;
    for (let u = 0; u < columns.length; u++) {
      //convert to text
      let cl = "";

      let arr = columns[u];
      for (let h = 0; h < arr.length; h++) {
        cl += arr[h];
      }
      let ind = getIndexesFromLine(cl);

      if (
        hasRepetition(cl) ||
        ind[0] != indexes[1][u] ||
        ind[1] != indexes[3][u]
      ) {
        isOk = false;
      }
    }

    if (isOk) return solutions[i];
  }

  return -1;
};

getSolution = (possibleLines, lineIndex, result, solutions) => {
  if (lineIndex < gridSize) {
    let line = possibleLines[lineIndex];
    let possibleLineLength = line.length;
    for (let i = 0; i < possibleLineLength; i++) {
      let tempRes = [];
      tempRes = [...result];
      tempRes.push(line[i]);
      //add recursion here
      getSolution(possibleLines, lineIndex + 1, tempRes, solutions);
    }
  } else {
    solutions.push(result);
  }
};

lineToCol = (lines) => {
  let col = [];
  //col to lines
  for (let i = 0; i < gridSize; i++) {
    let line = [];
    for (let u = 0; u < gridSize; u++) {
      line.push(lines[u][i]);
    }
    col.push(line);
  }
  return col;
};

checkColRep = (col) => {
  for (let i = 0; i < col.length; i++) {
    if (hasRepetition(col[i])) {
      return true;
    }
  }
  return false;
};
