class Square{
  constructor(coord, relations = [], distance = Infinity, prev = null) {
    this.coord = coord;
    this.relations = relations;
    this.distance = distance;
    this.prev = prev
  }
}

function isArrayInArray(arr, item){
  let item_as_string = JSON.stringify(item);

  let contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

let gameBoard = [];
let c = 0
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    gameBoard[c] = new Square([i,j]);
    c++;
  }
}

for (let i = 0; i < 64; i++) {
  let x = gameBoard[i].coord[0];
  let y = gameBoard[i].coord[1];
  let re1 = [x-1, y-2];
  let re2 = [x-2, y-1];
  let re3 = [x-1, y+2];
  let re4 = [x-2, y+1];
  let re5 = [x+1, y-2];
  let re6 = [x+2, y-1];
  let re7 = [x+1, y+2];
  let re8 = [x+2, y+1];
  for (let j = 0; j < 64; j++) {
    if (gameBoard[j].coord[0] == re1[0] && gameBoard[j].coord[1] == re1[1] || 
    gameBoard[j].coord[0] == re2[0] && gameBoard[j].coord[1] == re2[1] || 
    gameBoard[j].coord[0] == re3[0] && gameBoard[j].coord[1] == re3[1] || 
    gameBoard[j].coord[0] == re4[0] && gameBoard[j].coord[1] == re4[1] || 
    gameBoard[j].coord[0] == re5[0] && gameBoard[j].coord[1] == re5[1] || 
    gameBoard[j].coord[0] == re6[0] && gameBoard[j].coord[1] == re6[1] || 
    gameBoard[j].coord[0] == re7[0] && gameBoard[j].coord[1] == re7[1] || 
    gameBoard[j].coord[0] == re8[0] && gameBoard[j].coord[1] == re8[1]) {
      gameBoard[i].relations.push(gameBoard[j]);
    }
  }
}

function findSquare(coordinates) {
  for (let i = 0; i < 64; i++) {
    if (gameBoard[i].coord[0] == coordinates[0] && gameBoard[i].coord[1] == coordinates[1]) {
      return gameBoard[i];
    }
  }
}


function knightMoves(start, end) {
  let queue = [];
  queue.push(start);
  let visited = [];
  visited.push(start);
  while (queue.length > 0) {
    node = findSquare(queue.shift());
    for (relation of node.relations) {
      if (!isArrayInArray(visited, relation.coord)) {
        queue.push(relation.coord);
        visited.push(relation.coord);
        relation.prev = node.coord;
      }
    }
  }
  let path = [];
  let endingSquare = findSquare(end);
  currentSquare = findSquare(endingSquare.prev);
  path.push(end);
  while (currentSquare.prev != null) {
    path.push(currentSquare.coord);
    currentSquare = findSquare(currentSquare.prev);
  }
  path.push(start);
  path.reverse();
  let moveCount = path.length - 1;
  console.log ("You made it in " + moveCount + " moves! Here is your path:")
  console.log(path);
  return path;
}

knightMoves([3,6], [7,2]);