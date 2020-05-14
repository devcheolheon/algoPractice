function turn90(key) {
  var newKey = key.slice().map((v) => v.slice());
  for (var i = 0; i < key.length; i++) {
    for (var j = 0; j < key.length; j++) {
      newKey[j][key.length - 1 - i] = key[i][j];
    }
  }
  return newKey;
}
function checkLock(lock, key, diffx, diffy) {
  for (var i = 0; i < lock.length; i++) {
    for (var j = 0; j < lock.length; j++) {
      if (lock[i][j] == 1) {
        if (key[i + diffx] && key[i + diffx][j + diffy]) return false;
      }
      if (lock[i][j] == 0) {
        if (!key[i + diffx] || !key[i + diffx][j + diffy]) return false;
      }
    }
  }
  return true;
}
function tryAllDiff(lock, key, M, N) {
  var keys = [key];
  for (var i = 0; i < 3; i++) {
    keys.push(turn90(keys[keys.length - 1]));
  }
  var result = false;
  for (var diffx = -(M - 1); diffx <= N - 1; diffx++) {
    for (var diffy = -(M - 1); diffy <= M - 1; diffy++) {
      for (var k = 0; k < keys.length; k++) {
        if (checkLock(lock, keys[k], diffx, diffy)) return true;
      }
    }
  }
  return false;
}
function solution(key, lock) {
  var answer = true;
  var M = lock.length;
  var N = key.length;
  answer = tryAllDiff(lock, key, M, N);
  return answer;
}
