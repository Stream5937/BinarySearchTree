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

testArray = randArray(num, maxNum);
console.log('testArray: ',testArray);
tree = createBalancedBinarySearchTree (testArray);
tree.prettyPrint();

/*
testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
console.log('testArray: ',testArray);
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

