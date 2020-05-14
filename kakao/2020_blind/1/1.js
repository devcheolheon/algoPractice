function compress(s, size) {
  var result = size;
  var str = s.slice(0, size);
  var nextIndex = size;
  var nextStr = s.slice(nextIndex, nextIndex + size);
  var count = 1;
  while (nextStr.length > 0) {
    if (str == nextStr) {
      count++;
    } else {
      if (count > 1) result += ("" + count).length;
      result += nextStr.length;
      count = 1;
    }
    nextIndex = nextIndex + size;
    str = nextStr;
    nextStr = s.slice(nextIndex, nextIndex + size);
  }
  if (count > 1) result += ("" + count).length;
  return result;
}
function solution(s) {
  var answer = 0;
  var min = s.length;
  var size = 1;
  while (size <= Math.floor(s.length / 2)) {
    let length = compress(s, size);
    min = Math.min(length, min);
    size++;
  }
  return min;
}
