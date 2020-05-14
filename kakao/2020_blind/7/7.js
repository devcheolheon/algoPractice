function makeSafeBoard(board) {
  var safeBoard = [new Array(board.length + 2).fill(1)];
  board.forEach((row) => {
    safeBoard.push([1, ...row, 1]);
  });
  safeBoard.push(new Array(board.length + 2).fill(1));
  return safeBoard;
}
function makeVisited(length) {
  var visited = new Array(length)
    .fill(null)
    .map(() => new Array(length).fill(null).map(() => ({})));
  return visited;
}
function makeState(i, j, step, status) {
  return { i, j, step, status };
}
function markVisited(state, visited) {
  visited[state.i][state.j][state.status] = true;
  return;
}
function checkVisited(state, visited) {
  return visited[state.i][state.j][state.status];
}
function makeNextStates(curState) {
  var nextStates = [];
  const { i, j, status, step } = curState;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const rotations = [
    [
      [0, -1],
      [0, 0],
      [1, -1],
      [1, 0],
    ],
    [
      [-1, 0],
      [0, 0],
      [-1, 1],
      [0, 1],
    ],
  ];
  directions.forEach(([dx, dy]) => {
    var newi = dx + i;
    var newj = dy + j;
    nextStates.push(makeState(newi, newj, step + 1, status));
  });
  rotations[status].forEach(([dx, dy]) => {
    var newi = dx + i;
    var newj = dy + j;
    var newStatus = (status + 1) % 2;
    nextStates.push(makeState(newi, newj, step + 1, newStatus));
  });
  return nextStates;
}
function checkOk(curState, nextState, safeBoard) {
  const { i: ci, j: cj, status: cS } = curState;
  const { i: ni, j: nj, status: nS } = nextState;
  // not rotated;

  if (nS == 0) {
    if (safeBoard[ni][nj - 1] == 1 || safeBoard[ni][nj] == 1) return false;
  }

  if (nS == 1) {
    if (safeBoard[ni - 1][nj] == 1 || safeBoard[ni][nj] == 1) return false;
  }

  const rotationCheck = [
    [
      [
        [-1, -1],
        [-1, 0],
      ],
      [
        [1, -1],
        [1, 0],
      ],
    ],
    [
      [
        [-1, -1],
        [0, -1],
      ],
      [
        [-1, 1],
        [0, 1],
      ],
    ],
  ];
  if (cS != nS) {
    // rotated
    var result = true;
    var type = 0;
    if (cS == 0 && ni > ci) type = 1;
    if (cS == 1 && nj > cj) type = 1;
    var checkList = rotationCheck[cS][type];
    checkList.forEach(([dx, dy]) => {
      var checki = dx + ci;
      var checkj = dy + cj;
      if (safeBoard[checki][checkj] == 1) result = false;
    });
    if (!result) return false;
  }
  return true;
}

function solution(board) {
  var answer = 0;
  var state = makeState(1, 2, 0, 0);
  // i,j,step,status
  // status : 0-> -  1-> |
  var safeBoard = makeSafeBoard(board);
  var visited = makeVisited(safeBoard.length);
  markVisited(state, visited);
  var q = [state];
  while (q.length > 0) {
    var curState = q.shift();

    if (curState.i == board.length && curState.j == board.length)
      return curState.step;

    var nextStates = makeNextStates(curState);

    nextStates.forEach((nextState) => {
      if (
        checkOk(curState, nextState, safeBoard) &&
        !checkVisited(nextState, visited)
      ) {
        markVisited(nextState, visited);
        q.push(nextState);
      }
    });
  }
}
