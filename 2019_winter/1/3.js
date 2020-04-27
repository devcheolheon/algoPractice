function removeDuplicate(arr1){
    var result = []; 
    arr1.forEach((val)=>{
        if(result.every(val2 =>!same(val,val2)))
            result.push(val);
    }) 
    return result;
 }
 function same(arr1, arr2){
     if(arr1.length !== arr2.length) return false; 
     return arr1.every(val=>arr2.includes(val));
 }
 function findAnswer(result,answerList,index, count, final){
    if(index == answerList.length ){
        final.push(result.slice());
        return;
    };
    for(var i = 0 ; i < answerList[index].length; i++){
       if(!result.includes(answerList[index][i])){
           result.push(answerList[index][i]);
           count = findAnswer(result,answerList, index+1,count,final); 
           result.pop();
       }
    }
    return count;
 }
 function checkAnswerCount(answerList){
     var final = [];
     findAnswer([], answerList, 0, 0, final);
     //console.log(final);
     final = removeDuplicate(final);
     //console.log(final);
     return final.length;
 }
 function check(id_ch, banned_ch){
     if(id_ch.length !== banned_ch.length) return false;
     var index = 0; 
     while(id_ch[index]==banned_ch[index] || banned_ch[index] == '*'){
         index++
         if(index > id_ch.length) return true;
     }
     return false;
 }
 function solution(user_id, banned_id) {
     var answer = 0;
     var banned_id_arr = banned_id.map(
             (banned_ch)=>user_id.filter((id_ch=>check(id_ch,banned_ch)))
         );
    // console.log(banned_id_arr);
     var answerCount = checkAnswerCount(banned_id_arr);
     return answerCount;
 }