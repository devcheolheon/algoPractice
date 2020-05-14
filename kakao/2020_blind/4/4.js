function triInit() {
  var tri = { count: 0 };
  return tri;
}
function insertTri(tri, word, left = true) {
  tri.count++;
  if (word.length == 0) {
    return;
  }
  var c;
  var newword;
  if (left) {
    c = word[0];
    newword = word.slice(1);
  } else {
    c = word[word.length - 1];
    newword = word.slice(0, word.length - 1);
  }
  if (tri[c]) {
    insertTri(tri[c], newword, left);
  } else {
    tri[c] = { count: 0 };
    insertTri(tri[c], newword, left);
  }
}
function findWord(tri, queries, left) {
  if (queries.length == 0) return tri.count;
  var nextqueries;
  var qchar;
  if (left) {
    nextqueries = queries.slice(1);
    qchar = queries[0];
  } else {
    nextqueries = queries.slice(0, queries.length - 1);
    qchar = queries[queries.length - 1];
  }
  if (qchar == "?") return tri.count;
  if (!tri[qchar]) return 0;
  return findWord(tri[qchar], nextqueries, left);
}
function wordsLengthTri(tris, len) {
  if (!tris[len]) {
    var triLeft = triInit();
    var triRight = triInit();
    tris[len] = [triLeft, triRight];
  }
  return tris[len];
}
function solution(words, queries) {
  var tris = [];
  var answer = [];
  words.forEach((val) => {
    var [lefttri, righttri] = wordsLengthTri(tris, val.length);
    insertTri(lefttri, val, true);
    insertTri(righttri, val, false);
  });
  answer = queries.map((val) => {
    const [lefttri, righttri] = wordsLengthTri(tris, val.length);
    if (val[0] == "?") return findWord(righttri, val, false);
    else return findWord(lefttri, val, true);
  });
  return answer;
}
