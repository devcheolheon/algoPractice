function solution(board, moves) {
    var answer = 0;
    var answerStack = [];
    var boardStacks = new Array(board.length+1).fill('null').map(()=>[]);
  	for(var i = board.length-1; i >= 0; i--){
    	for(var j = 0 ; j < board[i].length; j++){
            if(board[i][j]==0) continue;
            boardStacks[j+1].push(board[i][j]);
        }    
    }
   	 
    moves.forEach(val =>{
       if(boardStacks[val].length == 0 ) return; 
       let pick = boardStacks[val].pop();
       if(answerStack.length > 0 && answerStack[answerStack.length-1] == pick){
           answer += 2;
           answerStack.pop();
       }else{
           answerStack.push(pick);
       }
    })
    
    return answer;
}