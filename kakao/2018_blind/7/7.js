function startEndTime(regArr) {
  var h = +regArr[1];
  var m = +regArr[2];
  var s = +regArr[3];
  var ms = +regArr[4];
  var works = +regArr[5];
  var workms = regArr[6] ? regArr[6] : 0;
  if (workms.length && workms.length == 1) workms *= 100;
  if (workms.length && workms.length == 2) workms *= 10;
  var endTime = (h * 60 * 60 + m * 60 + s) * 1000 + ms;
  var startTime =
    (h * 60 * 60 + m * 60 + s) * 1000 + ms - works * 1000 - workms;
  if (startTime < 0) startTime = 0;
  return [startTime, endTime];
}
function solution(lines) {
  var answer = 0;
  var regx = /2016-09-15 (\d\d):(\d\d):(\d\d).(\d\d\d) (\d)\.?(\d+)?s/;
  var sDic = {};
  var startEndLines = lines.map((line) => line.match(regx)).map(startEndTime);

  var starts = startEndLines.map(([start, end]) => start + 1);
  var ends = startEndLines.map(([start, end]) => end + 1000);
  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  var traffic = 0;
  var answer = 0;
  var startIndex = 0;
  var endIndex = 0;

  while (startIndex < starts.length) {
    if (starts[startIndex] < ends[endIndex]) {
      traffic++;
      answer = Math.max(traffic, answer);
      startIndex++;
    } else {
      traffic--;
      endIndex++;
    }
  }
  return answer;
}
