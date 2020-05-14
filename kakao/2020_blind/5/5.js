function isSafeFloor(i, j, floors, pills) {
  if (floors[i - 1][j] && floors[i + 1][j]) return true;
  if (pills[i][j - 1] || pills[i + 1][j - 1]) return true;
  return false;
}
function isSafePill(i, j, floors, pills) {
  if (j == 1) return true;
  if (floors[i - 1][j] || floors[i][j]) return true;
  if (pills[i][j - 1]) return true;
  return false;
}
function checkFloor(i, j, floors, pills) {
  var result = true;
  if (floors[i][j] && !isSafeFloor(i, j, floors, pills)) result = false;
  return result;
}
function checkPill(i, j, floors, pills) {
  var result = true;
  if (pills[i][j] && !isSafePill(i, j, floors, pills)) result = false;
  return result;
}
function isSafeNotFloor(i, j, floors, pills) {
  var result = true;
  floors[i][j] = false;
  if (!checkFloor(i - 1, j, floors, pills)) result = false;
  if (!checkFloor(i + 1, j, floors, pills)) result = false;
  if (!checkPill(i, j, floors, pills)) result = false;
  if (!checkPill(i + 1, j, floors, pills)) result = false;
  floors[i][j] = true;
  return result;
}
function isSafeNotPill(i, j, floors, pills) {
  var result = true;
  pills[i][j] = false;
  if (!checkFloor(i - 1, j + 1, floors, pills)) result = false;
  if (!checkFloor(i, j + 1, floors, pills)) result = false;
  if (!checkPill(i, j + 1, floors, pills)) result = false;
  pills[i][j] = true;
  return result;
}
function solution(n, build_frame) {
  var answer = [];
  var pills = new Array(n + 3).fill(null).map(() => []);
  var floors = new Array(n + 3).fill(null).map(() => []);
  build_frame.forEach(([i, j, type, add]) => {
    i = i + 1; // safe
    j = j + 1; // safe
    console.log(i, j, type, add);
    if (!add) {
      // 0 del 1 add
      if (type) {
        // 0 pill 1 floor
        if (isSafeNotFloor(i, j, floors, pills)) {
          floors[i][j] = false;
        }
      } else {
        if (isSafeNotPill(i, j, floors, pills)) {
          pills[i][j] = false;
        }
      }
    } else {
      if (type) {
        // 0 pill 1 floor
        if (isSafeFloor(i, j, floors, pills)) {
          floors[i][j] = true;
        }
      } else {
        if (isSafePill(i, j, floors, pills)) {
          pills[i][j] = true;
        }
      }
    }
  });

  for (var i = 1; i < n + 2; i++) {
    for (var j = 1; j < n + 2; j++) {
      if (pills[i][j]) answer.push([i - 1, j - 1, 0]);
      if (floors[i][j]) answer.push([i - 1, j - 1, 1]);
    }
  }

  return answer;
}
