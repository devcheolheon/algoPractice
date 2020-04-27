function solve(sArray){
    var result = sArray[0]; 
    sArray.unshift();
    sArray.forEach((target)=>{
       var newValue = 0; 
       for(var i = 0; i < target.length; i++){
         var targetValue = target[i];
         if(!result.includes(targetValue)){
            newValue = targetValue; 
       		result.push(newValue);
            break;
         }
       }
    });
    return result; 
}
function solution(s) {
    var answer = [];
    var index = 1; 
    var arr = [];
    var sArray = []
    var temp = ''; 
    while(index < s.length-1){
        if(s[index]=='{'){
            arr = [];
            temp = '';
            index++;
            continue;
        }
        if(s[index]== '}'){
            arr.push(+temp);
            sArray.push(arr)
            index++; // ,
            index++;
            continue;
        }
        if(s[index]==','){
            arr.push(+temp); 
            temp = '';
            index++;
            continue;
        }
       	temp += ''+s[index];
        index++;
    }
    sArray = sArray.sort((a,b)=>{return a.length-b.length});
    answer = solve(sArray);
    return answer;
}