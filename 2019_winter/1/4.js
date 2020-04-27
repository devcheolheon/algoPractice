function findKey(map,key){
    if(!map.has(key)){
        map.set(key,key+1);
        return key;
    }
    var newKey = map.get(key);
    var findedKey = findKey(map,newKey);
    map.set(key,findedKey+1);
    return findedKey;
    
}
function solution(k, room_number) {
    var answer = [];
    var map = new Map(); 
    answer = room_number.map(
        (key)=>{
            return findKey(map,key);
        }
    )
    return answer;
}