function check(str) {
  var regx = /[a-z][a-z]/;
  return regx.test(str);
}
function divide2s(str) {
  var temp = [];
  var index = 2;
  if (str.length == 2) {
    if (check(str)) return [str];
  }
  for (index; index <= str.length; index++) {
    var s2 = str.slice(index - 2, index);
    if (check(s2)) temp.push(s2);
  }
  return temp;
}
function makeObj(arr) {
  var obj = {};
  arr.forEach((v) => {
    if (obj[v]) obj[v]++;
    else obj[v] = 1;
  });
  return obj;
}

function inters(obj1, obj2) {
  var inters = 0;
  var entry1 = Object.entries(obj1);
  for (var i = 0; i < entry1.length; i++) {
    var [key, value] = entry1[i];
    if (obj2[key]) {
      inters += Math.min(obj2[key], value);
    }
  }
  return inters;
}
function unions(obj1, obj2) {
  var unions = 0;
  var entry1 = Object.entries(obj1);
  var entry2 = Object.entries(obj2);
  for (var i = 0; i < entry1.length; i++) {
    var [key, value] = entry1[i];
    if (obj2[key]) {
      unions += Math.max(obj2[key], value);
    } else {
      unions += value;
    }
  }
  for (var i = 0; i < entry2.length; i++) {
    var [key, value] = entry2[i];
    if (!obj1[key]) unions += value;
  }
  return unions;
}

function Jaccard(arr1, arr2) {
  if (arr1.length < arr2.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  var obj1 = makeObj(arr1);
  var obj2 = makeObj(arr2);
  var i = inters(obj1, obj2);
  var u = unions(obj1, obj2);
  if (i == 0 && u == 0) return 65536;
  return Math.floor((i / u) * 65536);
}
function solution(str1, str2) {
  var answer = 0;
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  var str1Arr = divide2s(str1);
  var str2Arr = divide2s(str2);
  answer = Jaccard(str1Arr, str2Arr);
  return answer;
}
