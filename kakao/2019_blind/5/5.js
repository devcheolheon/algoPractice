function preOrder(tree, result) {
  if (tree == null) return;
  result.push(tree.i);
  preOrder(tree.left, result);
  preOrder(tree.right, result);
}
function postOrder(tree, result) {
  if (tree == null) return;
  postOrder(tree.left, result);
  postOrder(tree.right, result);
  result.push(tree.i);
}

function makeNode(nodeY, dicbyYnodeX, yIndex, leftEdge, rightEdge) {
  if (yIndex == nodeY.length) return null;
  var curNode = dicbyYnodeX[nodeY[yIndex]][0];
  if (!curNode) return null;
  if (leftEdge < curNode.x && curNode.x < rightEdge) {
    dicbyYnodeX[nodeY[yIndex]].shift();
    var treeNode = { ...curNode };
    treeNode.left = makeNode(
      nodeY,
      dicbyYnodeX,
      yIndex + 1,
      leftEdge,
      curNode.x
    );
    treeNode.right = makeNode(
      nodeY,
      dicbyYnodeX,
      yIndex + 1,
      curNode.x,
      rightEdge
    );
    return treeNode;
  }
  return null;
}
function makeTree(nodeY, dicbyYnodeX) {
  var root = makeNode(nodeY, dicbyYnodeX, 0, -1, 100001);
  return root;
}
function solution(nodeinfo) {
  var answer = [[]];
  var nodeY = [];
  var dicbyYnodeX = {};

  nodeinfo.forEach((v, i) => {
    var x = v[0];
    var y = v[1];
    if (!dicbyYnodeX[y]) {
      nodeY.push(y);
      dicbyYnodeX[y] = [];
    }
    dicbyYnodeX[y].push({ x, y, i: i + 1 });
  });

  nodeY.sort((a, b) => b - a);
  nodeY.forEach((yIndex) => {
    dicbyYnodeX[yIndex].sort((a, b) => a.x - b.x);
  });

  var tree = makeTree(nodeY, dicbyYnodeX);
  var preResult = [];
  var postResult = [];
  preOrder(tree, preResult);
  postOrder(tree, postResult);
  answer = [preResult, postResult];
  return answer;
}
