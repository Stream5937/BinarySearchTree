/*
    Write a driver script that does the following:

    Create a binary search tree from an array of random numbers < 100.
    Create a function that returns an array of random numbers every time you call it.
    Confirm that the tree is balanced by calling isBalanced.
    Print out all elements in level, pre, post, and in order.
    Unbalance the tree by adding several numbers > 100.
    Confirm that the tree is unbalanced by calling isBalanced.
    Balance the tree by calling rebalance.
    Confirm that the tree is balanced by calling isBalanced.
    Print out all elements in level, pre, post, and in order.
*/

import {Node} from "./nodeClass.js";
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

let num = 20;
let maxNum = 100;
let check;
let testArray;
let tree;
let node;
let height;
let val;
let treeIsBalanced;
let reBalancedTree;

console.log('\n-------------------------------------------------------------------------------\n');
console.log('Running Test Script: ');
console.log('\nRandom test array');
//Create a test array of random numbers < 100.
testArray = randArray(num, maxNum);// ## TEMP ## testArray = randArray(num, maxNum); ## TEMP ##
//testArray = [79,85,89,81,7,29,12,9,40,51,85,66,33,22,11,10,45,27,4,59];//20 entries, 85 duplicated 19 unique
//testArray = [79,85,89,81];
//testArray = [79,85,89,81,7,29,12];    
//testArray = [79,85,89,81,7,29,12,9,40,51,85,66];
//console.log('testArray: ',testArray);
//Create a binary search tree from the array 
console.log('\nSearch tree:');
tree = createBalancedBinarySearchTree (testArray);
//console.log('checking tree root: ',tree.root);
tree.prettyPrint();
/**/
//Confirm that the tree is balanced by calling isBalanced.
treeIsBalanced = tree.isBalanced(tree.root);
console.log('\nConfirm tree balanced? ',treeIsBalanced);
/*/
/*
//Print out all elements in level, pre, post, and in order.
/*
//LEVELORDER  fails  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nThrow error for function call lacking callback function');
tree._q.empty();
tree.levelOrder();  //expect throws error as needs callback function

//LEVELORDER  works  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed levelOrder:')
tree._q.empty();    //ENSURE TREE QUEUE IS EMPTY AT START
node = tree.levelOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}

//INORDER    ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed inOrder:')
tree._q.empty();
node = tree.inOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}

//PREORDER    ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed preOrder:')
tree._q.empty();
node = tree.preOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
*//*
//POSTORDER     ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed postOrder, with depth:')
tree.po_q.empty();
//node = tree.postOrder(tree.root, (node =>  node.logNode()));
node = tree.postOrder(tree.root, (node => {
    tree.dep_q.empty();
    console.log('depth at ',node.value,' : ',tree.depth(tree.root, node.value));
}));
if(node){
    console.log('root: ', node.value ,' ');
}
else{console.log('complete');} 
*/

//UNBALANCE THE TREE by adding several numbers > 100 
tree.insert(tree.root, 116);
tree.insert(tree.root, 126);
tree.insert(tree.root, 106);
tree.prettyPrint();

console.log('\n---------------a---------------------------------------------\n');
//Confirm that the tree is unbalanced by calling isBalanced.  MUST INCLUDE ROOT
console.log(tree.isBalanced(tree.root));     //expects false -OK
console.log('\n---------------a---------------------------------------------\n');


console.log('\n---------------b---------------------------------------------\n');
node = tree.postOrder(tree.root, (node => {
    let balanced = true;
    let count = 1;//tree._array.length;
    while(balanced && count){
        balanced = tree.isBalanced(node);
        count--;
    }
    console.log('node: ',node,', balanced: ',balanced);
}));
console.log('\n---------------b---------------------------------------------\n');
if(node){console.log('node: ',node);}
else{console.log('complete');}
/*/
/*
//Balance the tree by calling rebalance.    MUST ASSIGN A NEW TREE!
reBalancedTree = tree.reBalance(tree.root);
reBalancedTree.prettyPrint();
*/
//Confirm that the tree is now balanced by calling isBalanced.  MUST INCLUDE ROOT
//console.log(reBalancedTree.isBalanced(reBalancedTree.root));     //expects true -FAILS
//NB USING OUT OF BALANCE TREE
/*
tree._q.empty();
check = Math.floor(Math.random()* num);
if(!(check === undefined)){
console.log('depth to: ',testArray[check],',: ', tree.depth(tree.root, testArray[check]) );}
tree._q.empty();
check = Math.floor(Math.random()* num);
if(!(check === undefined)){
console.log('depth to: ',testArray[check],',: ', tree.depth(tree.root, testArray[check]) );}

*/

//------------------------END OF TEST SCRIPT------------------------------------------*/
//previous tests:
/******--------------------------------INSERT--------------------------------------------- 
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
-----------------------------------------INSERT-------------------------------------------*/
/*
let noRepeat = removeDuplicates(testArray);
console.log('noDuplicates: ', noRepeat);

let sortedArray = noRepeat.sort(function(a, b){return a - b});
console.log('sortedArray: ', sortedArray);
*/

/*----------------------------------BUILDTREE------------------------------------------------------------
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
---------------------------------------------BUILDTREE------------------------------------------- */

/*------------------------------------------QUEUE--------------------------------------------------
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
console.log('queue empty ?',q.isEmpty);
----------------------------------------------QUEUE----------------------------------------------*/

/*---------------------------------------HEIGHT WRONG!!-------------------------------------------
//test height(node)
testArray = [1,3,5];
//console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();

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
*//*
console.log('\n-------------------------------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint(); */
/*
val = 67;
console.log('depth to ',val,', ',tree.depth(tree.root, val));
val = 324;
console.log('depth to ',val,', ',tree.depth(tree.root, val));
*/
/*--------------------------------DEPTH & HEIGHT----------------------------------------
console.log('\n---------------------------------------------\n');
val = 7;
console.log('depth to value ',val,', is: ',tree.depth(tree.root, val));
console.log('height to value ',val,', is: ',tree.height(tree.root, val));
console.log('\n---------------------------------------------\n');
tree._q.empty();

val = 8;
console.log('depth to value ',val,', is: ',tree.depth(tree.root, val));
console.log('height to value ',val,', is: ',tree.height(tree.root, val));
console.log('\n---------------------------------------------\n');
tree._q.empty();

val = 6345;
console.log('depth to value ',val,', is: ',tree.depth(tree.root, val));
console.log('height to value ',val,', is: ',tree.height(tree.root, val));
console.log('\n---------------------------------------------\n');
tree._q.empty();
console.log('\n---------------------------------------------\n');
/*
val =99;
console.log('depth to ',val,', ',tree.depth(tree.root, val));
console.log('height to value ',val,', is: ',tree.height(tree.root, val));
console.log('\n---------------------------------------------\n');
tree._q.empty();
*//*
val =67;
console.log('depth to ',val,', ',tree.depth(tree.root, val));
console.log('height to value ',val,', is: ',tree.height(tree.root, val));
console.log('\n---------------------------------------------\n');
tree._q.empty();
----------------------------------DEPTH & HEIGHT-------------------------------------------*/

/*-------------------------------------FIND---------------------------------------------------------------
console.log('\n----------------------find 5---------------------------------------------------------\n');
node = (tree.find(tree.root, 5))
if(node){node.logNode();}else{console.log(null);}
console.log('\n-----------------------find 7--------------------------------------------------------\n');
node = tree.find(tree.root, 7);
if(node){node.logNode();}else{console.log(null);}
*//*
console.log('\n-----------------------find 324--------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint();
let depth = (tree.depth(324));
console.log('depth: ', depth);
console.log('\n-------------------------------------------------------------------------------\n');
-----------------------------------------FIND-----------------------------------------------------------*/

/*--------------------------------CURRENTLY WRONG!!------------------------------------------------
//height of node
console.log('\n-------------------------------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);    //works ok
tree.prettyPrint();

let nodeHeight = tree.heightFN(tree.root, 324);
console.log('node height: ', nodeHeight);
console.log('\n-------------------------------------------------------------------------------\n');
-----------------------------------------WRONG-----------------------------------------------------*/

/*---------------------LEVELORDER----------------------------
//tree.levelOrder();  //expect throws error
/*
let numbers = [1, 2, 4, 7, 3, 5, 6];
tree = createBalancedBinarySearchTree (numbers);
tree.prettyPrint();

node = tree.levelOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}
*/
/*
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345 ]);
tree.prettyPrint();
node = tree.levelOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}
/*---------------------------------------------------------------*/

/*-------------------INORDER------------------------------
//tree = new Tree([1,2,3,4,5,6,7,8,11,14]);
tree = new Tree([1,2,3,4,5,7,8,11,14]);
tree.prettyPrint();
node = tree.inOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}

tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,14]);
tree.prettyPrint();
node = tree.inOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}
/*----------------------------------------------------------*/

/*--------------PREORDER-------------------------------
tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,14]);
tree.prettyPrint();
node = tree.preOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}
-----------------------------------------------------*/

/*---------------POSTORDER----------------------------
tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,14]);
tree.prettyPrint();
/*prints equivalent of:
        v-----------6-----------v
    v---3---v               v---9-----v
    1-v     4-v             7-v    v--11--v
      2       5               8   10      14

Expected output for post order:
    2,1,5,4,3,8,7,10,14,11,9,6
*/
/*
node = tree.postOrder(tree.root, (node => node.logNode() ));
if(node){console.log('node: ',node);}
else{console.log('complete');}
/*--------------------------------------------------------*/

/*-------------------------------ISBALANCED------------------------------------------------------
//create an unbalanced tree
console.log('\n-------------------------------------------------------------------------------\n');
tree = new Tree([ 1, 3, 4, 5, 7, 8, 9, 10, 23, 67, 324, 6345 ]);    //works ok
//tree.prettyPrint();
tree.insert(tree.root, 63);
tree.insert(tree.root, 60);
tree.prettyPrint();
console.log('isBalanced: ',tree.isBalanced(tree.root));
/*----------------------------------ISBALANCED---------------------------------------------------*/

/*---------------------------------REBALANCE-----------------------------------------------------
console.log('\n-------------------------------------------------------------------------------\n');
const rebalanced = tree.reBalance(tree.root);
rebalanced.prettyPrint()
console.log('\n-----------------------------------------------------------------------------------\n');
/*---------------------------------REBALANCE-----------------------------------------------------*/

/*----------------------------------DELETE------------------------------------------------------
console.log('\n-------------------------------------------------------------------------------\n');
//let someTree = rebalanced.delete(rebalanced.root, 63);
//console.log('someTree: ',someTree);
const amendedTree = rebalanced.delete(rebalanced.root, 63);
//console.log('amendedTree: ',amendedTree);
amendedTree.prettyPrint();
console.log('\n-------------------------------------------------------------------------------\n');
/*----------------------------------DELETE------------------------------------------------------*/

