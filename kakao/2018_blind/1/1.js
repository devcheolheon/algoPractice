function make2th(val, n) {
  var result = new Array(n).fill(0);
  var index = 0;
  while (val > 0) {
    var value = val % 2;
    result[result.length - 1 - index++] = value;
    val /= 2;
    val = Math.floor(val);
  }
  return result;
}

function solution(n, arr1, arr2) {
  var answer = [];
  arr1 = arr1.map((val) => make2th(val, n));
  arr2 = arr2.map((val) => make2th(val, n));
  answer = arr1.map((r, i) => r.map((v, j) => v || arr2[i][j]));
  answer = answer.map((r) => r.map((v) => (v ? "#" : " ")).join(""));
  return answer;
}
