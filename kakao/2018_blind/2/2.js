function isNum(c) {
  return !Number.isNaN(+c);
}
function parse(d) {
  var result = [];
  var i = 0;
  var tempNum = "";
  while (d.length > i) {
    if (isNum(d[i])) {
      tempNum += d[i++];
    } else {
      var point = +tempNum;
      var type = d[i++];
      var special = "";
      if (d[i] == "*" || d[i] == "#") {
        special = d[i++];
      }
      result.push({ point, type, special });
      tempNum = "";
    }
  }
  return result;
}
function calculatePoint(obj, i, arr) {
  var point = obj.point;
  if (obj.type == "D") point *= point;
  if (obj.type == "T") point *= point * point;
  if (obj.special) {
    if (obj.special == "*") {
      point += point;
      if (i > 0) {
        arr[i - 1] *= 2;
      }
    } else {
      point = -point;
    }
  }
  return point;
}
function solution(dartResult) {
  var answer = 0;
  var parsed = parse(dartResult);
  for (var i = 0; i < parsed.length; i++) {
    parsed[i] = calculatePoint(parsed[i], i, parsed);
  }
  answer = parsed.reduce((acc, val) => acc + val, 0);
  return answer;
}
