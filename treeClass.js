/*
https://en.wikipedia.org/wiki/Binary_search_tree

Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not

NB IMPORTANT TO MAINTAIN EFFICIENCY 
binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations so:-
implementation of these methods should traverse the tree and manipulate the nodes and their connections.
NOT manipulate the array!

Write a find(value) function that returns the node with the given value.

Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list

Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.

Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.

Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.

Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.

Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

*/

import {Node} from "./nodeClass.js";

//const node  = new Node(value, leftSubNode, rightSubNode);

class Tree {

    //private variables
    _array = [];
    _root = null;

    constructor (array) {
        //cater for incorrect invocation i.e not using 'new' keyword
        if(!(this instanceof Tree)) {
            //throw error:
            throw Error('Error: Incorrect invocation needs new key word');
            //or
            //return new Tree:
            // ie a new Tree(sortedNonDuplicateArray);
            // return new Tree(array);
        }else{
         //the node
         //this._array = array;                     //a sortedNonDuplicateArray   
         //or
         this._array = this._array.concat(array);  //a sortedNonDuplicateArray 
         this._root = this.buildTree(this._array, 0, ((this._array).length)-1);           
       }
    }

    //getters & setters
    get root () {
        return this._root;
    }

    // class methods

    /*
    Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
    */

    buildTree (array, start, end) {
        let root = null;
       // let leftSubNode = null;
       // let rightSubNode = null;
        let len = array.length;
        
        if(len === 0) {
            //console.log('Array invalid for tree construct'); 
            return root = null;
        }
        //let start =0; 
        //let end = len-1;
        if (start > end){
           // console.log('Array invalid for tree construct'); 
            return root = null;
        }

        //mid index
        let midIndex = start +(Math.floor((end - start)/ 2));
       // console.log('array: ',array,', len: ',len,', start: ',start,', midIndex: ',midIndex, ', end: ', end);

        // Create root node
        root = new Node(array[midIndex]);

        // Create left subtree
        root.leftSubNode  = this.buildTree(array, start, midIndex - 1);
        
        // Create right subtree
        root.rightSubNode = this.buildTree(array, midIndex + 1, end);

        return root;
    }

    /*
    visualize the binary search tree with prettyPrint(). Function to console.log the tree in a structured format. This function will expect to receive the root of tree as the value for the node parameter.
*/

    prettyPrint = (node = this._root, prefix = "", isLeft = true) => {
        if (node === null) {
        return;
        }
        if (node.rightSubNode !== null) {
        this.prettyPrint(node.rightSubNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.leftSubNode !== null) {
        this.prettyPrint(node.leftSubNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    /*
        Insert node.
        Initialise the current node (say, currNode or node) with root node
        Compare the key with the current node.
        Move left if the key is less than or equal to the current node value.
        Move right if the key is greater than current node value.
        Repeat steps 2 and 3 until you reach a leaf node.
        Attach the new key as a left or right child based on the comparison with the leaf node’s value.
    */
    //recursive insert() with initial call to root = this._root
    insert (root, value) {
        //console.log('129: root: ', root);
        let node;           // 
       //return the new node if at empty (leaf) node
        if(root === null){
            root = new Node (value);
            //console.log('134: root: ', root, ', value: ', root.value);
            return root;}
        //let next;
        // check not trying to insert value already present ?
        if(value === root.value){console.log('Value already present'); return node;}
        //decide whether  to left or right
        if (value > root.value) {
            //console.log('141: root: ', root, ', value: ', root.value);
            root.rightSubNode = this.insert(root.rightSubNode, value);
            //console.log('143 root: ', root, ', value: ', root.value);
            return root;
        }else{
           //console.log('146 root: ', root, ', value: ', root.value);
           root.leftSubNode= this.insert(root.leftSubNode, value);
           //console.log('148 root: ', root, ', value: ', root.value);
           return root;
        }
        
    }

    //Confirm that the tree is balanced by calling isBalanced.
    isBalanced (searchTree) {
        let isBalanced = false;

        
        return isBalanced;
    }


}


export {Tree}