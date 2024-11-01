/*
    Write a driver script that does the following:

    Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
    Confirm that the tree is balanced by calling isBalanced.
    Print out all elements in level, pre, post, and in order.
    Unbalance the tree by adding several numbers > 100.
    Confirm that the tree is unbalanced by calling isBalanced.
    Balance the tree by calling rebalance.
    Confirm that the tree is balanced by calling isBalanced.
    Print out all elements in level, pre, post, and in order.
*/

import {Node} from "./nodeClass.js";
//const node  = new Node(value, leftSubNode, rightSubNode);
import {Tree} from "./treeClass.js";
import {Queue} from "./queueClass.js"

//a function that returns an array of num random numbers each < maximum number maxNum
function randArray( num, maxNum) {
    let randArray = [];
    let i =0;
    let val;
   
    for( i; i< num ; i++){
        val = Math.floor(Math.random()* maxNum);
        randArray.push(val);
    }
    return randArray;
}

//remove duplicates from array
function removeDuplicates(array) {
   // console.log('array:.. ', array, ' ..');
    let len = array.length;
    let val;
    for (let i =0; i < len; i++){
        //console.log('i: ',i);
        val = array[i]
        for(let j =0; j< len; j++){
            if(j === i){
                //skip
            }else{
                if(array[j] === val){
                    //console.log('array[j]: ', array[j]);
                   array.splice(j,1) ;
                }
            }
        } 
    }
   // console.log('array:** ', array, ' **');
   return array;
}

//sort numerically ascending
//for array array use  -->>    array.sort(function(a, b){return a - b});
//sort numerically descending
//for array array use  -->>    array.sort(function(a, b){return b - a});


//Create a binary search tree from an array of random numbers < 100.
//ensure array sorted
//ensure array stripped of duplicates
//createBalancedBinarySearchTree
function  createBalancedBinarySearchTree (array) {
    //sort numeric array low to high
    const sortedArray = array.sort(function(a, b){return a - b});
    //remove duplicates
    const leanArray = removeDuplicates(sortedArray);
    //create balanced binary sort tree
    return new Tree(leanArray);
}




//Print out all elements in printFormat is either level, pre, post, or in order.
function printTree (printFormat) {

}

//test: Unbalance the tree by adding several numbers > 100.

/*
let balancedTree = createBalancedBinarySearchTree(testArray);
console.log('testArray balanced ? : ', isBalanced(balancedTree);)
let unbalancedTree = ????   //testArray.concat([101, 156, 127]);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log('unbalanced - balanced ? : ', isBalanced(unbalancedTree);)
*/

//Balance the tree by calling rebalance.

//Confirm that the tree is balanced by calling isBalanced.

//Print out all elements in level, pre, post, and in order.
 

//TEST SCRIPT

//let testArray = [1,1,2,3,4,5,6,6,,7,8,9,9];
let num = 10;
let maxNum = 100;
let testArray;
let tree;
let height;

/*
testArray = randArray(num, maxNum);
console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
*/
/*
//testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
//testArray = [1,3,5,7,9,11];
console.log('\n--------------------Prior to insert 4--------------------------------\n');
testArray = [1,3,5];
console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
//tree.root.logNode();
console.log('\n--------------------Post insert 4 -----------------------------------\n');
tree.insert(tree.root, 4);
//tree.root.logNode();
tree.prettyPrint();
console.log('\n--------------------Prior to insert 0--------------------------------\n');
testArray = [1,3,5];
console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
//tree.root.logNode();
console.log('\n--------------------Post insert 0 -----------------------------------\n');
tree.insert(tree.root, 0);
//tree.root.logNode();
tree.prettyPrint();
console.log('\n--------------------Prior to insert 6--------------------------------\n');
testArray = [1,3,5];
console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
//tree.root.logNode();
console.log('\n--------------------Post insert 6 -----------------------------------\n');
tree.insert(tree.root, 6);
//tree.root.logNode();
tree.prettyPrint();

*/
/*
let noRepeat = removeDuplicates(testArray);
console.log('noDuplicates: ', noRepeat);

let sortedArray = noRepeat.sort(function(a, b){return a - b});
console.log('sortedArray: ', sortedArray);
*/

/*
console.log('\n---------------[ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]---------------------------------');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint();
console.log('\n-------------------------testArray----------------------------------------------------');
tree = new Tree(testArray);     //ok
tree.prettyPrint();
console.log('\n-------------------------[1,2,3,4]----------------------------------------------------');
tree = new Tree([1,2,3,4]);     //ok
tree.prettyPrint();
console.log('\n--------------------------[1,2,3]---------------------------------------------------');
tree = new Tree([1,2,3]);       //ok
tree.prettyPrint();
console.log('\n---------------------------[1,2]--------------------------------------------------');
tree = new Tree([1,2,]);        //ok
tree.prettyPrint();
console.log('\n---------------------------[1]--------------------------------------------------');
tree = new Tree([1]);           //ok
tree.prettyPrint();
 */
/*
//test queue class
//test queue
let q = new Queue();
for (let i = 1; i <= 7; i++) {
  q.enqueue(i);
}
// get the current item at the front of the queue
console.log('peeking first in queue: ', q.peek()); // 1

// get the current length of queue
console.log('queue length: ',q.length); // 7

// dequeue all elements
console.log('logging the set of queue values head to tail: ');
while (!q.isEmpty) {
  console.log('queue value: .. ', q.dequeue());
}
*/

//test height(node)
testArray = [1,3,5];
//console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
/*
//console.log('tree.root: ',tree.root);
//tree.root.logNode();
height = tree.height(tree.root);
console.log('height: ', height);
console.log('\n-------------------------------------------------------------------------------\n');
tree.insert(tree.root, 6);
//tree.root.logNode();
tree.prettyPrint();
height = tree.height(tree.root);
console.log('height: ', height);
console.log('\n-------------------------------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint();
height = tree.height(tree.root);
console.log('height: ', height);
console.log('\n-------------------------------------------------------------------------------\n');
tree.insert(tree.root, 30);
tree.prettyPrint();
height = tree.height(tree.root);
console.log('height: ', height);
*/
console.log('\n-------------------------------------------------------------------------------\n');
(tree.find(tree.root, 5)).logNode();
console.log('\n-------------------------------------------------------------------------------\n');
let node = tree.find(tree.root, 7);
if(node){node.logNode;}else{console.log(null);}
console.log('\n-------------------------------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint();
(tree.find(tree.root, 67)).logNode();
console.log('\n-------------------------------------------------------------------------------\n');