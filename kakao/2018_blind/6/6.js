function boardDown(m, n, b, searched) {
  var result = 0;
  while (searched.length > 0) {
    var [i, j] = searched.pop();
    var dir = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    dir.forEach(([dx, dy]) => {
      var di = dx + i;
      var dj = dy + j;
      if (b[di][dj] !== 0) {
        result++;
        b[di][dj] = 0;
      }
    });
  }
  for (var j = 0; j < n; j++) {
    var temp = new Array(+m).fill(0);
    for (var i = 0; i < m; i++) {
      if (b[i][j] !== 0) {
        temp.push(b[i][j]);
      }
    }
    temp = temp.slice(temp.length - m);
    temp.forEach((v, i) => {
      b[i][j] = v;
    });
  }
  return result;
}
function search(m, n, b, searched) {
  for (var i = 0; i < m - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      if (
        b[i][j] !== 0 &&
        b[i][j] == b[i + 1][j] &&
        b[i + 1][j] == b[i][j + 1] &&
        b[i + 1][j] == b[i + 1][j + 1]
      )
        searched.push([i, j]);
    }
  }
}
function solution(m, n, board) {
  var answer = 0;
  var b = board.map((s) => s.split(""));
  while (true) {
    var searched = [];
    search(m, n, b, searched);
    if (searched.length == 0) break;
    answer += boardDown(m, n, b, searched);
  }
  return answer;
}
