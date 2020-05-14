function checkUrl(url) {
  var urlRegx = /^https:\/\/\S/;
  if (urlRegx.exec(url) !== null) {
    return true;
  }
  return false;
}
function makePageObject(tags, word) {
  var basicPoint = 0;
  var mylink = tags.filter(
    (tag) => tag["property"] == "og:url" && checkUrl(tag["content"])
  );
  if (!mylink[0]) return null;
  mylink = mylink[0].content;

  var text = tags.filter((tag) => tag.name == "text").map((v) => v.value);
  word = word.toLowerCase();
  text.forEach((t) => {
    var words = t.split(/[^a-zA-Z]/);
    words.forEach((docWord) => {
      if (docWord.toLowerCase() == word) basicPoint++;
    });
  });

  var link = tags
    .filter(
      (tag) =>
        tag.name == "a" && tag.href && checkUrl(tag.href) && tag.href !== mylink
    )
    .map((v) => v.href);

  var linkDic = {}; //중복 제거
  var link = link.filter((l) => {
    if (linkDic[l]) return false;
    else {
      linkDic[l] = true;
      return true;
    }
  });
  return { mylink, text, link, basicPoint };
}
function makeTagNode(stringTag) {
  var type = "couple";
  var TagObject = {};
  if (stringTag.indexOf("/>") != -1) {
    type = "solo";
    stringTag = stringTag.replace("/>", "");
  }
  if (stringTag[0] != "<") {
    TagObject.name = "text";
    TagObject.value = stringTag.toLowerCase();
    return TagObject;
  }
  if (typeof stringTag != "string") {
    return;
  }
  stringTag = stringTag.replace("</", "");
  stringTag = stringTag.replace("<", "");
  stringTag = stringTag.replace(">", "");

  var stringAttributes = stringTag.split(" ");
  TagObject.name = stringAttributes[0];
  TagObject.type = type;
  stringAttributes.forEach((attribute, i) => {
    if (i == 0) return;
    if (attribute.length == 0) return;
    var attr = attribute.split('="');
    TagObject[attr[0].trim().replace(/["]/gi, "")] = attr[1]
      .trim()
      .replace(/["]$/gi, "");
  });
  return TagObject;
}
function preProcess(page) {
  var result = [];
  var startBracket = "<";
  var endBracket = ">";
  var i = 0;
  var startIndex = 0;
  var stringStart = i;
  var endIndex = -1;
  var tempString = "";
  var findedString = false;
  while (i < page.length) {
    if (page[i] == startBracket) {
      startIndex = i;
      if (findedString) {
        result.push(page.slice(endIndex + 1, startIndex).trim());
        findedString = false;
      }
    }
    if (page[i] == endBracket) {
      endIndex = i;
      result.push(page.slice(startIndex, endIndex + 1));
    }
    if ((startIndex < endIndex || endIndex == -1) && endIndex < i) {
      if (page[i] !== "\n" && page[i] !== " " && page[i] !== "\t") {
        findedString = true;
      }
    }
    i++;
  }
  if (endIndex < i) result.push(page.slice(endIndex + 1));
  return result;
}

function solution(word, pages) {
  var answer = 0;
  var stringTagsArray = pages.map((page) => preProcess(page));
  var TagsArray = stringTagsArray.map((stringTags) =>
    stringTags.map((stringTag) => makeTagNode(stringTag))
  );
  var pageObjects = TagsArray.map((tags) => {
    return makePageObject(tags, word);
  });
  console.log(pageObjects);
  var linkInDic = {};
  var linkIndexDic = {};
  pageObjects.forEach((pageObj, index) => {
    if (!pageObj) return;
    var im = pageObj.mylink;
    linkIndexDic[im] = index;
    pageObj.link.forEach((link) => {
      if (!linkInDic[link]) linkInDic[link] = [im];
      else linkInDic[link].push(im);
    });
  });
  var points = pageObjects.map((pageObj) => {
    if (!pageObj) return null;
    var im = pageObj.mylink;
    var linkIn = linkInDic[im];
    var point = 0;
    point += pageObj.basicPoint;
    if (!linkIn) return point;
    linkIn.forEach((link) => {
      var index = linkIndexDic[link];
      point += pageObjects[index].basicPoint / pageObjects[index].link.length;
    });
    return point;
  });
  var max = Math.max(...points);
  answer = points.indexOf(max);
  return answer;
}
