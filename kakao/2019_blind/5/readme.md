## 트리 만들기

### 아이디어

- node의 x y 좌표가 트리 조건에 맞게 주어지고 해당 x y 좌표에 따라 부모와 좌우 자식 관계가 결정됨

- 트리를 만들때 해당 영역에서 가장 y 값이 큰 값이 root고, root node의 좌 우 자식으로는
  root의 값 좌우 영역을 나누어서 또 다시 root를 찾게하는 재귀호출을 함

- 해설의 아이디어에 따르면 루트를 찾는 작업이 항상 작은 x에서 큰 x 범위로 가게끔 한다면,
  같은 y값 별로 큐를 만들고 해당 큐를 x값으로 정렬해서 빠르게 처리하게 할 수 있다고 해서 그렇게 함

### 문제점

-
