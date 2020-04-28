function findCandidate(user_id, index, targetLength , candidate, result){
    if(index > user_id.length) return; 
    if(targetLength == candidate.length) result.push(candidate.slice());
    if(targetLength > candidate.length){
        findCandidate(user_id, index+1, targetLength, candidate, result);
        candidate.push(user_id[index]);
        findCandidate(user_id, index+1, targetLength, candidate, result);
        candidate.pop();
    }
 }
 function makeAnswerCandidate(user_id,banned_id){
     var result = []; 
     var targetLength = banned_id.length
     findCandidate(user_id,0,targetLength,[],result);
     return result; 
 }
 function isBanned(id,ban){
     var i = 0; 
     if(id.length!==ban.length) return false; 
        while(i< id.length && (id[i]==ban[i] || ban[i]=='*' )) i++; 
     if(i==id.length) return true; 
     else false; 
 }
 function checkrecur(answer,banned){
     if(banned.length == 0) return true;
     var result = false;
     for(var i = 0 ; i < answer.length ; i++){
         for(var j = 0 ; j < banned.length; j++ ){
             if(isBanned(answer[i],banned[j])){
                 var tempanswer = answer.slice();
                 var tempbanned = banned.slice();
                 answer.splice(i,1);
                 banned.splice(j,1);
                 result = checkrecur(answer,banned);
                 answer=tempanswer;
                 banned=tempbanned;
             }
             if(result) break; 
         }
         if(result) break;
     }
     return result;
 }
 function check(answer, banned_id){
    var bannedTemp = banned_id.slice();
    var answerTemp = answer.slice();
    return checkrecur(answerTemp, bannedTemp)
 }
 function checkAnswerCount(banned_id){
    return function(acc, answer){
        if(check(answer, banned_id)) acc+=1;
        return acc; 
    } 
 }
 
 function solution(user_id, banned_id) {
     var answer = 0;
     var AnswerCandidate = makeAnswerCandidate(user_id, banned_id);
     answer = AnswerCandidate.reduce(checkAnswerCount(banned_id), 0);
     return answer;
 }