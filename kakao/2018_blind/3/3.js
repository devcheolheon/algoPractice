function makeCache(n) {
  var cache = new Array(n).fill("");
  const isInCache = function (str) {
    return cache.indexOf(str) !== -1;
  };
  const putFirst = function (str) {
    var index = cache.indexOf(str);
    if (index !== -1) {
      cache.splice(index, 1);
    }
    cache.unshift(str);
  };
  const deleteCache = function () {
    cache.length = n;
  };
  return {
    findCache: function (str) {
      if (isInCache(str)) {
        putFirst(str);
        return true;
      } else {
        putFirst(str);
        deleteCache();
        return false;
      }
    },
  };
}
function solution(cacheSize, cities) {
  var answer = 0;
  var chache = makeCache(cacheSize);
  answer = cities.reduce((acc, city) => {
    if (chache.findCache(city.toLowerCase())) acc += 1;
    else acc += 5;
    return acc;
  }, 0);
  return answer;
}
