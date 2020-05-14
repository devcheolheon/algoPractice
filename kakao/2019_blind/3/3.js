function makeAllPossibleKeys(len) {
  var columns = new Array(len).fill(null).map((v, i) => i);
  var result = [[]];
  columns.forEach((column) => {
    var newKeys = [];
    result.forEach((key) => {
      var newKey = key.slice();
      newKey.push(column);
      newKeys.push(newKey);
    });
    result = result.concat(newKeys);
  });
  result.shift();
  return result;
}

function isIncludeSome(key, CandidateKeys) {
  return CandidateKeys.some((CandidateKey) => {
    if (key.length < CandidateKey.length) return false;
    return CandidateKey.every((column) => key.includes(column));
  });
}

function makeKeyString(key, row) {
  var result = "";
  key.forEach((i) => {
    result += row[i];
  });
  return result;
}

function checkUnique(key, relation) {
  var keyCheckObj = {};
  var result = true;
  relation.forEach((row) => {
    var stringKey = makeKeyString(key, row);
    if (keyCheckObj[stringKey]) {
      result = false;
    } else {
      keyCheckObj[stringKey] = true;
    }
  });
  return result;
}

function solution(relation) {
  var answer = 0;
  var columnLength = relation[0].length;
  var allPossibleKeys = makeAllPossibleKeys(columnLength);
  allPossibleKeys.sort((a, b) => a.length - b.length);
  var CandidateKeys = [];
  allPossibleKeys.forEach((key) => {
    if (isIncludeSome(key, CandidateKeys)) return;
    if (checkUnique(key, relation)) {
      CandidateKeys.push(key);
    }
  });
  return CandidateKeys.length;
}
