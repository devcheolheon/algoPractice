function solution(stones, k) {
    stones.push(Infinity);
    var answer = Infinity;
    var stack = [{value : Infinity , index : -1}];
    
    stones.forEach((value, index)=>{
        var Stone = { value , index };
        while(stack[stack.length-1].value < Stone.value){
            var mid = stack.pop();
            if(Stone.index - stack[stack.length-1].index > k){
                answer = Math.min(mid.value , answer);
            }
        }
        stack.push(Stone);
    })
    return answer;
}