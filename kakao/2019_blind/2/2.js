function solution(N, stages) {
  var answer = [];
  var counter = new Array(N + 2).fill(0);
  var accCounter = [];

  stages.forEach((v) => {
    counter[v]++;
  });

  accCounter = counter.slice();

  var i = 0;

  for (var i = accCounter.length - 1; i > 0; i--) {
    accCounter[i - 1] += accCounter[i];
  }

  answer = new Array(N).fill(null).map((v, i) => i + 1);

  // 실패율..
  for (var i = accCounter.length - 1; i > 0; i--) {
    if (accCounter[i] == 0) accCounter[i] = 0;
    else accCounter[i] = counter[i] / accCounter[i];
  }

  answer.sort((a, b) => {
    if (accCounter[a] == accCounter[b]) {
      return a - b;
    } else {
      return accCounter[b] - accCounter[a];
    }
  });

  return answer;
}
