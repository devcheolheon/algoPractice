function makeTuple(answer, target){
    if(answer.length==0) return target;
    if(answer.length > target.length){
    	var ArrInTarget = answer.filter((val)=>target.includes(val));
        var ArrNotInTarget = answer.filter((val)=>!target.includes(val));
        return ArrInTarget.concat(ArrNotInTarget)
    }
    if(target.length > answer.length){
        var arrNotInAnswer = target.filter((val)=>!answer.includes(val));
        return answer.concat(arrNotInAnswer);
    } 
}
function parse(s){
    var parsingResult = []; 
    var index = 0; 
    var arrTemp = [];
    var charTemp = '';
   	for(index = 1 ; index <= s.length-2 ; index++){
       if(s[index]=='{') {
           arrTemp = [];
           continue;
       }
       if(s[index]==','){
           continue;
       }
       if(s[index]=='}') {
           parsingResult.push(arrTemp);
           continue;
       }
       if(s[index+1]==','||s[index+1]=='}'){
           charTemp+=s[index];
           arrTemp.push(+charTemp);
           charTemp='';
       }else{
           charTemp+=s[index];
       }
    }
    return parsingResult;
}
function solution(s) {
    var answer = [];
    var sArr = parse(s); 
    var answer = sArr.reduce(makeTuple,[])
    return answer;
}