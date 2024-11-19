/*
https://en.wikipedia.org/wiki/Binary_search_tree

Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal 
with several cases for delete, such as when a node has children or not

NB IMPORTANT TO MAINTAIN EFFICIENCY 
binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations so:-
implementation of these methods should traverse the tree and manipulate the nodes and their connections.
NOT manipulate the array!

Write a find(value) function that returns the node with the given value.

Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list

Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.

Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in
 the longest path from a given node to a leaf node.

Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in
the path from a given node to the tree’s root node.

Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference 
between heights of the left subtree and the right subtree of every node is not more than 1.

Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to 
provide a new array to the buildTree function.

In-order, LNR

    Recursively traverse the current node's left subtree.
    Visit the current node (in the figure: position green).
    Recursively traverse the current node's right subtree.

In a binary search tree ordered such that in each node the key is greater than all keys in its left subtree and less than all keys in its right subtree, in-order traversal retrieves the keys in ascending sorted order.[7] 

Pre-order, NLR

    Visit the current node (in the figure: position red).
    Recursively traverse the current node's left subtree.
    Recursively traverse the current node's right subtree.

The pre-order traversal is a topologically sorted one, because a parent node is processed before any of its child nodes is done. 

Post-order, LRN

    Recursively traverse the current node's left subtree.
    Recursively traverse the current node's right subtree.
    Visit the current node (in the figure: position blue).

Post-order traversal can be useful to get postfix expression of a binary expression tree. 

06/11/23 CHECK ACTION OF CALLBACK(NODE) -done - levelOrder(), inOrder() preOrder() & postOrder() amended
*/

import {Node} from "./nodeClass.js";
import {Queue} from "./queueClass.js";
//to facilitate user interaction at terminal for testing only
//import promptSync from 'prompt-sync';
//const prompt = promptSync();
//const result = prompt(message);

class Tree {

    //private variables
    _array = [];
    _root = null;
                        //some individual queues
    dep_q = null;       //depth
    del_q = null;       //delete
    h_q = null;         //height
    b_q = null;         //isBalanced
    rb_q = null;        //rebalance
    lo_q = null;        //levelOrder
    io_q = null;        //inOrder
    po_q = null;        //postOrder

    _processed = [];            //08/11/24 TEMP LOGGING postOrder()
    _enqueued = [];             //08/11/24 TEMP LOGGING postOrder()
    _delNodeArray =[];

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
         this.dep_q = new Queue;
         this.del_q = new Queue; 
         this.h_q = new Queue; 
         this.b_q = new Queue; 
         this.rb_q = new Queue; 
         this.lo_q = new Queue; 
         this.io_q = new Queue;           
         this.po_q = new Queue; 
       }
    }

    //getters & setters
    get root () {
        return this._root;
    }

    set root (node) {
        this._root = node;
    }

    // class methods

    /*
    Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
    */

    buildTree (array, start, end) {
        let root = null;
        let len = array.length;
        
        if(len === 0) {
            return root = null;
        }
        
        if (start > end){
            return root = null;
        }

        //mid index
        let midIndex = start +(Math.floor((end - start)/ 2));

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
            console.log('No tree!');
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
        
        let node;
        //return the new node if at empty (leaf) node
        if(root === null){
            root = new Node (value);
            return root;
        }
        
        // check not trying to insert value already present ?
        if(value === root.value){console.log('Value already present'); return root;}
        //decide whether  to left or right
        if (value > root.value) {
            root.rightSubNode = this.insert(root.rightSubNode, value);
            return root;
        }else{
           root.leftSubNode= this.insert(root.leftSubNode, value);
           return root;
        }
        
    }

    /*
        Write a find(value) function that returns the node with the given value.
    */
    find (root, val) {
        let node = null; 
        let hasChild = root.hasChild();
        
        if(root.value === val){ return node = root;}
        
        if (hasChild){
            //is val < or > root.value
            if(val < root.value){
                //search left
                node =  this.find(root.leftSubNode, val);              
            }else{
                //search right
                 node = this.find(root.rightSubNode, val);
            }   
        }
        return node;
    }
    
    //MUST ENSURE NEW OR EMPTY QUEUE BEFORE RUN
    //depth(val)
    depth (root, value) {
        let node = null; 
        let hasChild;
       
        if(!( (root === null )|| (root === undefined) )){
            hasChild = root.hasChild();
        }
        else{
            //root is null
            process.exit(0);
        }
     
        if(root.value === value){ 
            return this.dep_q.length;
        }

        if (hasChild){
            //enqueue node or node.value
            this.dep_q.enqueue(root.value);

            //is val < or > root.value
            if(value < root.value){
                //search left
                node =  this.depth(root.leftSubNode, value);         
            }else{
                //search right
                 node = this.depth(root.rightSubNode, value);
            }   
        }else{
            return;
        }
        return this.dep_q.length;
    }
    
    /*
        Delete node
        deleteItem(value) function that deletes the given value. Deal with several cases for delete, such as when a node has children or not

        Initialise the current node with root node
        Compare the key with the current node. If delete value equals node value then this node to be deleted.
        if this the tree root node then set tree root node to null i.e totally empty tree;
        else check subNode values for this root.
        if either subNodeValue === delete value then set this subNode is node to delete .
        check if this subNode has values other than null for its children if so reset root of deleted subNode to point to these children
    */
    //recursive delete(value) with initial call to root = this._root
    
    delete(value) {
        let savedLeftNode = null;
        let savedRightNode = null;
        let deletingRoot = false;
       
        const removeNode = (node, value) => {
       
        //return if not a node
        if (!node) {
            console.log('Not a node!');
            return null;
        }
        
        //found the value to delete
        if(value == node.value) {  
            //flag if node to delete === root
            if(this.root.value === value ){
                deletingRoot = true; 
                savedRightNode= this.root.rightSubNode;   
            }
            //but it has no children
            if (!node.leftSubNode && !node.rightSubNode) {   
                return null;
            }
    
        //only one child node to the right
            if (!node.leftSubNode) {
                //no left subNode to reinstate
                savedLeftNode = null;
                return node.rightSubNode;
            }
        //only one child node to the left
            if (!node.rightSubNode) {
                //save the leftSubNode for future reinstatement
                savedLeftNode = node.leftSubNode;
                return node.leftSubNode;
            }
    
            //save the leftSubNode for future reinstatement
            savedLeftNode = node.leftSubNode;
           
            //move down the right subNode
            let temp = node.rightSubNode;
           
            //now only interested in smallest node smaller than temp
            let cont = true;
            while(cont){
                switch (temp.hasChild()) {
                    case 'both' :
                    case 'left' :
                        if(temp.leftSubNode === null){
                            //do nothing
                            cont = false;
                        } else{
                            temp = temp.leftSubNode;
                            cont = true;
                        }
                        break;

                    case 'false':
                    case 'right': {
                            //do nothing
                            cont = false;
                    }
                    break;
                }
            }
            //reset the node prior to deleted node to point to replacement
            if(deletingRoot){
                //remove the temp node
                node =  removeNode(this.root, temp.value);
                //swap root to new root being node just deleted
                temp.leftSubNode = node.leftSubNode;
                temp.rightSubNode= node.rightSubNode;
                node = temp;
            }else{
                node = temp;
                node.leftSubNode = savedLeftNode;
            }
            return node;
        } else {
                if (value < node.value) {
                    node.leftSubNode = removeNode(node.leftSubNode, value); 
                    return node;
                } else {
                    node.rightSubNode = removeNode(node.rightSubNode, value);
                    return node;
                }
            }
        }
        this.root = removeNode(this.root, value);
    }
 

    /*
        Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.  
    */
    height (root, value) {
        let treeHeight = this.heightMax(root);
        this.h_q.empty();
        let nodeDepth = this.depth(root, value);
        let nodeHeight = treeHeight - nodeDepth;
        return nodeHeight;
    }

    /*
        this one is a heightMax(root) function that returns the given tree's height. Height here is defined as the number of edges in the longest path from root to the lowest leaf node. Called with trees root.
    */

    heightMax(root) {
        let height = 0;
        let l_height;
        let r_height;
        let max = 0;
        let hasChild = root.hasChild();
        root.logNode.value;
        
        if (hasChild){
            height++;
            switch (hasChild) {
                case 'both': {
                        l_height = height;
                        l_height += this.heightMax(root.leftSubNode);
                        max = l_height > max ? l_height : max;
                        r_height = height;
                        r_height += this.heightMax(root.rightSubNode);
                        max = r_height > max ? r_height : max
                    break;
                }
                case 'left': {
                        l_height = height;
                        l_height += this.heightMax(root.leftSubNode);
                        max = l_height > max ? l_height : max;
                    break;
                }
                case 'right': {
                        r_height = height;
                        r_height += this.heightMax(root.rightSubNode);
                        max = r_height > max ? r_height : max;
                    break;
                }
            }
                
        }
        return max;
    }
   

    /*
        isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
    */
    //Confirm that the tree is balanced by calling isBalanced.
    
    isBalanced (root) {
        //assume tree balanced then check
        let isBalanced = true;
        //use this.postOrder(root, callback_1) where callback_1 checks each node for depth of it's sub nodes
        //check depth of sub nodes
        //recursively check depth of each of this nodes sub-nodes by using this.preOrder(root, callback_2)
        //where callback_2 checks each subNode for hasChild and counts each yes comparing left with right
        //if > 1 then out of balance

        //ensure queue is empty to start
       // this.b_q.empty();  dep_q covered at each call to depth
        let maxLeft = 0;
        let maxRight = 0;
        let origin = root;

        let callback = (root) =>{
            if( !(isBalanced) ) {
                //already  found to be unbalanced so return 
                return;
            }

            let depthLeft  = 0;
            let depthRight = 0;
            let depth = 0;

            if(!(root.hasChild())){
               //balanced
                return;
            }else{

                if(root.leftSubNode){
                    this.dep_q.empty();
                    depth = this.depth(origin,root.leftSubNode.value );
                    this.postOrder(root.leftSubNode,callback);

                    if(root.leftSubNode.value < root.value){
                        depthLeft = depth;
                        //retain max for left
                         maxLeft = depthLeft > maxLeft ? depthLeft : maxLeft;
                    }else{
                        depthRight = depth;
                        //retain max for right
                        maxRight = depthRight > maxRight ? depthRight : maxRight;
                    }

                }else{
                    this.dep_q.empty();
                    depth = this.depth(origin,root.value );  
                        //retain max for left
                         maxLeft = depth;
                }
                
                if(root.rightSubNode){
                    this.dep_q.empty();
                    depth = this.depth(origin, root.rightSubNode.value);
                    this.postOrder(root.rightSubNode, callback);

                    if(root.rightSubNode.value > root.value){
                        depthRight = depth;
                        //retain max for right
                        maxRight = depthRight > maxRight ? depthRight : maxRight;
                    }else{
                        depthLeft  = depth;
                        //retain max for left
                        maxLeft = depthLeft > maxLeft ? depthLeft : maxLeft;
                    }

                }else{
                    this.dep_q.empty();
                    depth = this.depth(origin,root.value );
                    maxRight = depth ;
                } 
             }

            if( ((maxLeft - maxRight) > 1)  || ( (maxRight - maxLeft > 1)) ) {
                console.log('tree unbalanced at root', root.value );
                isBalanced = false;
            } 
            return;   
        }
        this.postOrder(root, callback);
        return isBalanced;
    }
    
    
    /*
        Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
        returns a new balanced tree
    */
   
    reBalance (root) {
        let newTree = null;
        //ensure queue is empty to start (IF USED)
        this.rb_q.empty();
        //array to collect nodes
        let nodeArray = [];

        let callback = (root) =>{nodeArray.push(root.value);}

        //inOrder traversal to collect nodes for new array thence new tree
        this.inOrder(root, callback);

        console.log(nodeArray);
       // ensure array sorted low -> high
        const sortedArray = nodeArray.sort(function(a, b){return a - b});
        console.log(sortedArray);

        newTree = new Tree(sortedArray);
        //newTree.prettyPrint();

        return newTree;
    }

    /*
        levelOrder function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    */
   levelOrder (node, callback ) {
        try{
            if(callback === undefined) {throw "callback function needed";}
            
            if( (node === null )|| (node === undefined) ){
                //used at only one subNode
                return;
            }
           
            //callback;
            callback(node);
            if(node.hasChild()){
                this.lo_q.enqueue(node.leftSubNode);
                this.lo_q.enqueue(node.rightSubNode);
                this.levelOrder(this.lo_q.dequeue(), callback);   //left
                this.levelOrder(this.lo_q.dequeue(), callback);   //right
            }else{
                return;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    /*
        inOrder(callback)
        Recursively traverse the current node's left subtree.
        Visit the current node
        Recursively traverse the current node's right subtree.

        In a binary search tree ordered such that in each node the key is greater than all keys in its left subtree and less than all keys in its right subtree, in-order traversal retrieves the keys in ascending sorted order.[7] 
    */
    inOrder (node, callback ) {
        let visited = []
        let left;
        let right;
        let child;   //to node.hasChild() ?
        try{
            if(callback === undefined) {throw "callback function needed";}
            
            if( (node === null )|| (node === undefined) ){
                //used at only one subNode ?
                return;
            }
            //record visit to node
            if(!(visited.includes(node.value))) {visited.push(node.value);}

            if(child = node.hasChild()){
                /*  possible responses for child(ren):
                    case 0: { return false; }
                    case 1: { return 'left';}
                    case 2: { return 'right';}
                    case 3: { return 'both';}
                */
                //get new left & right
                switch (child){
                    case 'both': {
                                    left = node.leftSubNode;
                                    right = node.rightSubNode;
                        break;
                    }
                    case 'left': {
                                    left = node.leftSubNode;
                                    right = null;
                        break;
                    }
                    case 'right': {
                                    left = null;
                                    right = node.rightSubNode;
                        break;
                    }
                    case false: {

                    }
                    default: {
                        throw 'Error at switch child';
                    }
                }
                
                //if new left 
                if(!(visited.includes(left))) {
                //so is new
                //store self  
                this.io_q.enqueue(node);
                //go left     
                this.inOrder(left, callback);
                }
                else{
                    //else ??
                }
                callback(node);
                //if new right      
                if(!(visited.includes(right))) {
                    //go right          
                    this.inOrder(right, callback);
                }else{
                    //else
                    //pop address
                    node = this.io_q.dequeue();
                    //go address 
                    this.inOrder(node, callback);
                }

            }else{
                //has child response 0;
                callback(node);
                return;
            }
            //return;
        }
        catch(error){
            console.log(error);
        }
    }


    /*
        Pre-order, NLR

        Visit the current node 
        Recursively traverse the current node's left subtree.
        Recursively traverse the current node's right subtree.

        The pre-order traversal is a topologically sorted one, because a parent node is processed before any of its child nodes is done. 

        If root is NULL then return
        Process root (For example, print root’s data)
        Preorder (root -> left)
        Preorder (root -> right)
    */
        preOrder (node, callback ) {
            let left;
            let right;
            let child;   //to node.hasChild() ?
            try{
                if(callback === undefined) {throw "callback function needed";}
                
                if( (node === null )|| (node === undefined) ){
                    //used at only one subNode ?
                    return;
                }
                
                //record visit to node  
                callback(node); 
                if(child = node.hasChild()){
                    /*  possible responses for child(ren):
                        case 0: { return false; }
                        case 1: { return 'left';}
                        case 2: { return 'right';}
                        case 3: { return 'both';}
                    */
                    //get new left & right
                    switch (child){
                        case 'both': {
                                        left = node.leftSubNode;
                                        this.preOrder(left, callback);
                                        right = node.rightSubNode;
                                        this.preOrder(right, callback);
                            break;
                        }
                        case 'left': {
                                        left = node.leftSubNode;
                                        this.preOrder(left, callback);
                                        right = null;
                            break;
                        }
                        case 'right': {
                                        left = null;
                                        right = node.rightSubNode;
                                        this.preOrder(right, callback);
                            break;
                        }
                        default: {
                            throw 'Error at switch child';
                        }
                    }
                }
            }
            catch(error){
                console.log(error);
            }
        }

    /*
        Post-order, LRN

        Recursively traverse the current node's left subtree.
        Recursively traverse the current node's right subtree.
        Visit the current node 

        Post-order traversal can be useful to get postfix expression of a binary expression tree. 

        If root is NULL then return
        postOrder (root -> left)
        postOrder (root -> right)
        Process root (For example, print(root->data))
    */
    postOrder (node, callback) {
        let left;
        let right;
        let child; 
        
        try{
            if(callback === undefined) {throw "callback function needed";}
            
            if( (node === null )|| (node === undefined) ){
                return;
            }
          
            this.po_q.enqueue(node.value);
            
            if(child = node.hasChild()){
                
                /*  possible responses for child(ren):
                    case 0: { return false; }
                    case 1: { return 'left';}
                    case 2: { return 'right';}
                    case 3: { return 'both';}
                */
                //get new left & right
                switch (child){
                    case 'both': {
                                    left = node.leftSubNode;
                                    this.postOrder(left, callback);
                                   
                                    callback(left); 
                                   
                                   if((this.po_q.length > 1)){  
                                       this.po_q.dequeue();
                                   }  
                                    right = node.rightSubNode;
                                    this.postOrder(right, callback);
 
                                    callback(right); 

                                   if((this.po_q.length > 1)){ 
                                        this.po_q.dequeue();
                                    }

                                    //process the topmost root
                                    if(this.po_q.length === 1){
                                        this.po_q.dequeue(); 
                                        callback(node);  
                                    return;
                                    }
                        break;
                    }
                    case 'left': {
                                    left = node.leftSubNode;
                                    this.postOrder(left, callback);
                                    right = null;
                                    callback(left);
                                    this.po_q.dequeue(); 
                                    return;
                        break;
                    }
                    case 'right': {
                                    left = null;
                                    right = node.rightSubNode;
                                    this.postOrder(right, callback);
                                    callback(right); 
                                    this.po_q.dequeue(); 
                                    return;
                        break;
                    }
                    default: {
                        throw 'Error at switch child';
                    }
                }    
            }else{
            
                return;
            }
        }
        catch(error){
            console.log(error);
            process.exit(0);
        } 
    } 
} //end of class

function  createBalancedBinarySearchTree (array) {
    //sort numeric array low to high
    const sortedArray = array.sort(function(a, b){return a - b});
    //remove duplicates
    const leanArray = removeDuplicates(sortedArray);
    //create balanced binary sort tree
    return new Tree(leanArray);
}

//remove duplicates from array
function removeDuplicates(array) {
     let len = array.length;
     let val;
     for (let i =0; i < len; i++){
         val = array[i]
         for(let j =0; j< len; j++){
             if(j === i){
                 //skip
             }else{
                 if(array[j] === val){
                    array.splice(j,1) ;
                 }
             }
         } 
     }
    return array;
 }

export {Tree}