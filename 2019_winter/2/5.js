function solution(stones, k) {
    stones.push(Infinity);
    var answer = Infinity;
    var stacks = [{index: -1, value: Infinity}];
    stones.forEach((value, index)=>{
        var current = {value, index};
        while(stacks[stacks.length-1].value < current.value){
            var mid = stacks.pop();
            if(current.index-stacks[stacks.length-1].index > k ){
                answer = Math.min(mid.value,answer);
            }
        }
        stacks.push(current);
    });
    return answer;
}