function equalParenIndex(p) {
  var i = 0;
  var balance = 0;
  while (i < p.length) {
    if (p[i] == "(") balance++;
    if (p[i] == ")") balance--;
    if (balance == 0) return i;
    i++;
  }
  return -1;
}
function rightParen(p) {
  if (p.length == 0) return false;
  var rightPcount = 0;
  var i = 0;
  while (i < p.length) {
    if (p[i] == "(") {
      rightPcount++;
    } else {
      if (rightPcount <= 0) return false;
      rightPcount--;
    }
    i++;
  }
  if (rightPcount !== 0) return false;
  return true;
}
function reverse(p) {
  if (p == "") return "";
  var temp = "";
  var i = 0;
  while (i < p.length) {
    if (p[i] == ")") temp += "(";
    else temp += ")";
    i++;
  }
  return temp;
}
function makeRight(p) {
  if (p == "") return "";
  var eq = equalParenIndex(p);
  var u = p.slice(0, eq + 1);
  var v = p.slice(eq + 1);
  if (rightParen(u)) {
    return u + makeRight(v);
  } else {
    return "(" + makeRight(v) + ")" + reverse(u.slice(1, u.length - 1));
  }
}
function solution(p) {
  var answer = "";
  answer = makeRight(p);
  return answer;
}
