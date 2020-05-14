function getValue(foodTimes, i) {
  if (i == 0) return foodTimes[i][0] * foodTimes[i][1];
  return (foodTimes[i][0] - foodTimes[i - 1][0]) * foodTimes[i][1];
}
function solution(food_times, k) {
  var answer = 0;
  var food_times_counter = {};
  food_times.forEach((v) => {
    if (!food_times_counter[v]) {
      food_times_counter[v] = 1;
    } else {
      food_times_counter[v] += 1;
    }
  });
  var foodTimes = Object.entries(food_times_counter);
  foodTimes.sort((a, b) => a[0] - b[0]);

  for (var i = foodTimes.length - 1; i > 0; i--) {
    foodTimes[i - 1][1] += foodTimes[i][1];
  }

  var temp = 0;
  var findedIndex = 0;
  for (var i = 0; i < foodTimes.length; i++) {
    if (temp + getValue(foodTimes, i) > k) {
      findedIndex = i;
      break;
    }
    temp += getValue(foodTimes, i);
  }

  // 다 먹음
  if (i == foodTimes.length) return -1;

  k -= temp;
  k %= foodTimes[findedIndex][1];
  var curEaten = foodTimes[findedIndex][0];

  for (var i = 0; i < food_times.length; i++) {
    if (food_times[i] - curEaten < 0) continue;
    if (k == 0) {
      answer = i + 1;
      break;
    }
    k--;
  }

  return answer;
}
