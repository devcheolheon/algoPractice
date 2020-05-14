function findKey(map,key){
    var foundKeys = []; 
    var found = key;
    while(map.has(found)){
        foundKeys.push(found);
        found = map.get(found)
    }
    while(foundKeys.length>0){
        var temp = foundKeys.pop();
        map.set(temp,found+1);
    }
    map.set(found, found+1);
    return found;
}

function solution(k, room_number) {
    var answer = [];
    var map = new Map();
    answer = room_number.map(val=>findKey(map,val));
    return answer;
}