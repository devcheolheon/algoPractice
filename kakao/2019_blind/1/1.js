function order(str) {
  var temp = str.split(" ");
  return temp[0];
}
function id(str) {
  var temp = str.split(" ");
  return temp[1];
}
function nick(str) {
  var temp = str.split(" ");
  return temp[2];
}
function solution(record) {
  var answer = [];

  var EnterOrChange = record.filter((s) => {
    return order(s) == "Enter" || order(s) == "Change";
  });

  var EnterOrLeave = record.filter((s) => {
    return order(s) == "Enter" || order(s) == "Leave";
  });

  var nameDic = {};
  EnterOrChange.forEach((s) => {
    var n = nick(s);
    var i = id(s);
    nameDic[i] = n;
  });

  answer = EnterOrLeave.map((s) => {
    var o = order(s);
    var i = id(s);
    if (o == "Enter") {
      return nameDic[i] + "님이 들어왔습니다.";
    } else {
      return nameDic[i] + "님이 나갔습니다.";
    }
  });

  return answer;
}
