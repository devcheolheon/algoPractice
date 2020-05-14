### 해시키 문제

### 아이디어

충돌시 linear probing으로 키를 찾는 로직이
만약 굉장히 느려진다면 어떻게 해결할 것인가

빈 방을 찾기 위해 조회했던 모든 키에 최종적으로 찾은 키 값을 넣어주기

### 문제점

- object 키 값 조회보다 더 빠른 방법이 필요하다.

해시 키를 저장하는 저장소로 습관적으로 object를 하나 사용했었는데
마지막 효율성 테스트를 도무지 통과하지 못하는 것을 발견
es6부터 도입된 map 자료구조를 쓰면 key value값을 넣고 빼오는 과정이 훨씬 빨라진다.

- 모든 키값을 갱신하려 들다간 시간이 부족하다.

현재 찾은 키 값과 최초로 조회한 키값 차이에 모든 값을 갱신하려 들면
효율성 테스트를 통과하지 못한다.

linear probing이 떨어져서 일어나다가 그 경계가 만나게 되는 일이 일어날때,
각 뭉텅이? (키값 충돌이 마구 일어난 영역) 안의 값을 다 고쳐줄 필요가 없이
입구의 값만 고쳐줘도, 다음번 linear probing의 key값을 빠르게 찾는데에는 충분하다는 것??
이렇게 대충 이해해 본다.

나중에 접하게 된 이것을 해결해내는 비슷한 모양의 알고리즘이 있는데

fast campus에 DAVE LEE 강사님의 강의자료에서
Kruskal 알고리즘을 구현하던 중, Union-find의 로직을 최적화하기 위해
union-by-rank, path compression 기법을 사용한다.

이때 사용된 path compression기법이랑 비슷한 것 같다.
이것은 Find를 실행한 노드에서 거쳐간 노드를 루트에 다이렉트로 연결하는 기법
(루트를 빨리 찾는 find가 되는 것이다)

이 문제에서는 빈 키값을 루트라고 봐도 될 것 같다.
파이썬으로 재귀로 이 알고리즘을 구현한 코드는 아름답기 때문에 여기다도 박아놓는다.

```python
# parent는 node의 parent를 저장한 배열이다.
# node는 배열의 index와 같다  0, 1,

def find(node):
    # path compression 기법
    if parent[node] != node:
        parent[node] = find(parent[node])
    return parent[node]
```
