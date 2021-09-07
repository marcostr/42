let first;
let last;
let gridSize = 4;
//let lines = [];

setLine = () => {
  let result = "";

  let lines = [];
  calcLine(1, result, lines);
  return lines;
};

calcLine = (index, result, lines) => {
  let tempIndex = index;

  if (result.length == gridSize) {
    if (!hasRepetition(result)) {
      lines[lines.length] = result;
    }
  } else {
    for (let i = 1; i <= gridSize; i++) {
      let tempResult = result + i;
      tempIndex++;
      calcLine(tempIndex, tempResult, lines);
    }
  }
};

hasRepetition = (serie) => {
  for (let i = 0; i < serie.length; i++) {
    let nb = serie[i];
    for (let u = 0; u < serie.length; u++) {
      if (u != i && serie[u] == nb) {
        return true;
      }
    }
  }
  return false;
};

keepRequiredValues = (list, required) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    let serie = list[i];
    let ok = true;
    for (let u = 0; u < serie.length; u++) {
      if (serie[u] != required[u] && required[u] != 0) {
        ok = false;
      }
    }
    if (ok) {
      result.push(list[i]);
    }
  }
  return result;
};

removeForbiddenValues = (list, forbidden) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    let serie = list[i];
    let ok = true;
    for (let u = 0; u < serie.length; u++) {
      if (serie[u] == forbidden[u]) {
        ok = false;
      }
    }
    if (ok) {
      result.push(list[i]);
    }
  }

  return result;
};

getIndexesFromLine = (line) => {
  let indexes = [];
  indexes[0] = getIndexLeft(line);
  indexes[1] = getIndexRight(line);
  return indexes;
};

getIndexLeft = (line) => {
  let index = 1;

  for (let i = 1; i < line.length; i++) {
    let bigger = true;
    for (let u = 0; u < i; u++) {
      if (line[u] > line[i]) {
        bigger = false;
      }
    }
    if (bigger) index++;
  }
  return index;
};
getIndexRight = (line) => {
  let rev = line.split("").reverse().join("");
  return getIndexLeft(rev);
};
setRight = (val, index, forbiddenValues, result) => {
  for (let i = 0; i < array.length; i++) {
    let val = i + 1;

    if (checkForbiddenValues(val, forbiddenValues)) {
      result[i] = val;
    }
  }
};

checkForbiddenValues = (val, forbiddenValues) => {
  for (let i = 0; i < forbiddenValues.length; i++) {
    if (val == forbiddenValues[i]) {
      return false;
    }
  }
  return true;
};
