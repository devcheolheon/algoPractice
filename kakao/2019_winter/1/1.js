function pick (board, position){
    var x = 0; 
    var y = position-1;
    var picked = -1; 
    while( x < board.length && board[x][y] == 0 ) x++; 
    if(x >= board.length) return picked;
    if(board[x][y]!==0){
        picked = board[x][y];
        board[x][y] = 0;
    }
    return picked;
}
function solution(board, moves) {
    var answer = 0;
    var bowl = []; 
    var counter = 0; 
   
    moves.forEach((position)=>{
       let picked = pick(board,position); 
       if(picked > 0){
          if(bowl[bowl.length-1]==picked){
              bowl.pop();
              counter += 2; 
          }
          else
              bowl.push(picked)
       }
    })
    return counter;
}