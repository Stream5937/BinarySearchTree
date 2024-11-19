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

console.log('\n------------------------------Create Array----------------------------------------------\n');
console.log('Running Test Script: ');
console.log('\nRandom test array');
//Create a test array of random numbers < 100.
testArray = randArray(num, maxNum);
//testArray = [79,85,89,81,7,29,12,9,40,51,85,66,33,22,11,10,45,27,4,59];//20 entries, 85 duplicated 19 unique
//testArray = [79,85,89,81];
//testArray = [79,85,89,81,7,29,12];    
//testArray = [79,85,89,81,7,29,12,9,40,51,85,66];
console.log('testArray: ',testArray);

console.log('\n-----------------------Create a Balanced Binary Search Tree-------------------------------\n');
//Create a binary search tree from the array 
console.log('\nBinary Search tree:');
tree = createBalancedBinarySearchTree (testArray);
//console.log('checking tree root: ',tree.root);
tree.prettyPrint();
console.log('\n-----------------------Check tree is balanced--------------------------------------------\n');
//Confirm that the tree is balanced by calling isBalanced.
treeIsBalanced = tree.isBalanced(tree.root);
console.log('\nConfirm tree balanced? ',treeIsBalanced);

console.log('\n-----------------------Print out--------------------------------------------------------\n');

//Print out all elements in level, pre, post, and in order.
console.log('\n------------------Level order- throws error no callback---------------------------------\n');
//LEVELORDER  fails  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nThrow error for function call lacking callback function');
tree.lo_q.empty();
tree.levelOrder();  //expect throws error as needs callback function
console.log('\n------------------Level order with callback---------------------------------------------\n');
//LEVELORDER  works  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed levelOrder:')
tree.lo_q.empty();    //ENSURE TREE QUEUE IS EMPTY AT START
node = tree.levelOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------in order with callback---------------------------------------------\n');
//INORDER    ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed inOrder:')
tree.io_q.empty();
node = tree.inOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------pre order with callback---------------------------------------------\n');
//PREORDER    //ENSURE TREE QUEUE IS EMPTY AT START   NOT USED
console.log('\nTree values printed preOrder:')
//tree._q.empty();
node = tree.preOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------post order with callback---------------------------------------------\n');
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
console.log('\n------------------Insert values to unbalance the tree ---------------------------------\n');

//UNBALANCE THE TREE by adding several numbers > 100 
tree.insert(tree.root, 116);
tree.insert(tree.root, 126);
tree.insert(tree.root, 106);

tree.insert(tree.root, 36);
tree.insert(tree.root, 26);

tree.prettyPrint();

console.log('\n---------------check with isBalanced()  ---------------------------------------------\n');
//Confirm that the tree is unbalanced by calling isBalanced.  MUST INCLUDE ROOT
console.log('tree is balanced?: ',tree.isBalanced(tree.root));     //expects false -OK
console.log('\n---------------Rebalance the tree---------------------------------------------\n');

//Balance the tree by calling rebalance.    MUST ASSIGN A NEW TREE!
reBalancedTree = tree.reBalance(tree.root);
reBalancedTree.prettyPrint();
console.log('\n---------------check with isBalanced()  ---------------------------------------------\n');
//Confirm that the tree is now balanced by calling isBalanced.  MUST INCLUDE ROOT
console.log(reBalancedTree.isBalanced(reBalancedTree.root));     //expects true

console.log('\n-----------------------Print out--------------------------------------------------------\n');

//Print out all elements in level, pre, post, and in order.
console.log('\n------------------Level order- throws error no callback---------------------------------\n');
//LEVELORDER  fails  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nThrow error for function call lacking callback function');
tree.lo_q.empty();
tree.levelOrder();  //expect throws error as needs callback function
console.log('\n------------------Level order with callback---------------------------------------------\n');
//LEVELORDER  works  ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed levelOrder:')
tree.lo_q.empty();    //ENSURE TREE QUEUE IS EMPTY AT START
node = tree.levelOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------in order with callback---------------------------------------------\n');
//INORDER    ENSURE TREE QUEUE IS EMPTY AT START
console.log('\nTree values printed inOrder:')
tree.io_q.empty();
node = tree.inOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------pre order with callback---------------------------------------------\n');
//PREORDER    //ENSURE TREE QUEUE IS EMPTY AT START   NOT USED
console.log('\nTree values printed preOrder:')
//tree._q.empty();
node = tree.preOrder(tree.root, (node => {console.log(' ', node.value,' ');} ) );
if(node){console.log('root: ', node.value ,' ');}
else{console.log('complete');}
console.log('\n------------------post order with callback---------------------------------------------\n');
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



console.log('\n------------------test delete()---------------------------------------------\n');
testArray = [79,85,89,81,7,29,12,9,40,51,85,66];
console.log('testArray: ',testArray);
console.log('\n-----------------------Create a Balanced Binary Search Tree-------------------------------\n');
//Create a binary search tree from the array 
console.log('\nBinary Search tree:');
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();

console.log('\n------------------tree.delete(51)no child--------------------------------------\n');
testArray = [51];
console.log('testArray: ',testArray);
console.log('\nBinary Search tree:');
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();
tree.del_q.empty();
tree = tree.delete(51);
if (tree) {tree.prettyPrint();}else{console.log('NoTree!');}

console.log('\n------------------tree.delete(51) with children--------------------------------\n');
testArray = [79,85,89,81,7,29,12,9,40,51,85,66];
console.log('testArray: ',testArray);
console.log('\n-----------------------Create a Balanced Binary Search Tree---------------------\n');
//Create a binary search tree from the array 
console.log('\nBinary Search tree:');
tree = createBalancedBinarySearchTree (testArray);
//tree.prettyPrint();
tree.del_q.empty();
tree.delete(51);          // WORKs deleting root
//tree.delete(12);          //works
//tree.delete(66);          //WORKS & CLUE FOR REMOVE ROOT AT 51
//tree.delete(79);          //works
tree.prettyPrint();
console.log('tree is balanced ?: ',tree.isBalanced(tree.root));

//------------------------END OF TEST SCRIPT------------------------------------------*/
