function toMinuteString(minute) {
  var hour = (minute - (minute % 60)) / 60;
  var minute = minute % 60;
  hour = 9 >= hour ? "0" + hour : hour + "";
  minute = 9 >= minute ? "0" + minute : minute + "";
  return hour + ":" + minute;
}
function getBusTime(i, t) {
  var morning = 60 * 9;
  return morning + i * t;
}
function toMinute(v) {
  var arr = v.split(":").map((v) => +v);
  return arr[0] * 60 + arr[1];
}
function solution(n, t, m, timetable) {
  var answer = 0;

  var hourTable = timetable.map((v) => toMinute(v)).sort((a, b) => a - b);
  var busTable = new Array(n).fill(null).map((v, i) => getBusTime(i, t));
  var busNum = 0;
  var hourNum = 0;
  var taked = 0;

  while (busNum < busTable.length) {
    taked = 0;
    while (
      hourNum < hourTable.length &&
      hourTable[hourNum] <= busTable[busNum] &&
      taked < m
    ) {
      hourNum++;
      taked++;
    }
    busNum++;
  }
  if (taked == m) answer = Math.max(answer, hourTable[hourNum - 1] - 1);
  else answer = Math.max(answer, busTable[busNum - 1]);

  return toMinuteString(answer);
}
