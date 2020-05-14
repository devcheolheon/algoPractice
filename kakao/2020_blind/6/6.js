function tryThisDist(weak, dist) {
  var tempweak = weak.slice();
  var tempdist = dist.slice();
  var counter = 1;
  var curPos = tempweak.shift();
  var cover = tempdist.shift();
  var w;
  while (tempweak.length > 0) {
    while (tempweak.length > 0 && cover + curPos >= tempweak[0]) {
      tempweak.shift();
    }
    if (tempdist.length == 0 || tempweak.length == 0) break;
    curPos = tempweak.shift();
    cover = tempdist.shift();
    counter++;
  }
  if (tempweak.length > 0) return -1;
  return counter;
}
function solve(n, weak, dist) {
  var tempweak = weak.slice();
  var result = tryThisDist(weak, dist);
  if (result != -1) {
    return result;
  }
  for (var i = 0; i <= tempweak.length; i++) {
    var w = tempweak.shift();
    tempweak.push(w + n);
    var result = tryThisDist(tempweak, dist);
    if (result != -1) {
      return result;
    }
  }
  return -1;
}

function shuffleTeam(shuffled, team, result) {
  if (team.length == 0) {
    var shuffledCopy = shuffled.slice();
    result.push(shuffledCopy);
  } else {
    for (var i = 0; i < team.length; i++) {
      var tempMember = team.splice(i, 1)[0];
      shuffled.push(tempMember);
      shuffleTeam(shuffled, team, result);
      shuffled.pop();
      team.splice(i, 0, tempMember);
    }
  }
}

function shuffle(picks) {
  var shuffledPicks = [];
  picks.forEach((team) => {
    var result = [];
    shuffleTeam([], team, result);
    shuffledPicks = shuffledPicks.concat(result);
  });
  return shuffledPicks;
}

function makePicks(dist) {
  var picks = dist.reduce(
    (acc, member) => {
      var newAcc = [];
      acc.forEach((team) => {
        var temp = team.slice();
        temp.push(member);
        newAcc.push(temp);
      });
      return acc.concat(newAcc);
    },
    [[]]
  );
  picks.shift();
  return picks;
}
function makeAllPossibles(dist) {
  var picks = makePicks(dist);
  var shuffledPicks = shuffle(picks);
  return shuffledPicks;
}
function solution(n, weak, dist) {
  var allPossibleDist = makeAllPossibles(dist);
  allPossibleDist.sort((a, b) => a.length - b.length);
  for (var i = 0; i < allPossibleDist.length; i++) {
    var team = allPossibleDist[i];
    var result = solve(n, weak, team);
    if (result != -1) return result;
  }
  return -1;
}
