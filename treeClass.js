/*
https://en.wikipedia.org/wiki/Binary_search_tree

Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal
                        ***************** 
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

//const node  = new Node(value, leftSubNode, rightSubNode);
//const prompt = require('prompt-sync')();
import promptSync from 'prompt-sync';
const prompt = promptSync();
//const result = prompt(message);

class Tree {

    //private variables
    _array = [];
    _root = null;
    _q = null;

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
         this._q = new Queue;          
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
        
        let node;           // 
       //return the new node if at empty (leaf) node
        if(root === null){
            root = new Node (value);
            //console.log('173: root: ', root, ', value: ', root.value);
            return root;}
        //let next;
        // check not trying to insert value already present ?
        //console.log('root.value: ', root.value, ', value: ', value);
        if(value === root.value){console.log('Value already present'); return root;} //mod 31/10/24
        //decide whether  to left or right
        if (value > root.value) {
            //console.log('181: root: ', root, ', value: ', root.value);
            root.rightSubNode = this.insert(root.rightSubNode, value);
            //console.log('183 root: ', root, ', value: ', root.value);
            return root;
        }else{
           //console.log('186 root: ', root, ', value: ', root.value);
           root.leftSubNode= this.insert(root.leftSubNode, value);
           //console.log('188 root: ', root, ', value: ', root.value);
           return root;
        }
        
    }

    /*
        Write a find(value) function that returns the node with the given value.
    */
    find (root, val) {
        let node = null; 
        let hasChild = root.hasChild();
        //root.logNode;
        if(root.value === val){ return node = root;}
        //console.log('hasChild: ',hasChild);
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
        //console.log('at root q.len: ', this._q.length);
        let node = null; 
        let hasChild;
        //let copyQ;
        if(!( (root === null )|| (root === undefined) )){
            hasChild = root.hasChild();
        }
        else{
            //root is null
            console.log('call to value (',value,') : value not found !');
            //console.log('ret at 230');
            //return null;
            process.exit(0);
        }
        //console.log('root ',root.value,', val ',value);
        if(root.value === value){ 
            //copyQ = JSON.parse(JSON.stringify(this._q));
            //console.log('230copy: ',copyQ,', org: ', this._q);
            //console.log('(at root === value): q.len: ', this._q.length );
            //this._q = {};
            //return copyQ.length;
            //console.log('ret at 239');
            return this._q.length;
            
        }
        //console.log('hasChild: ', hasChild);
        if (hasChild){
            //enqueue node or node.value
            this._q.enqueue(root.value);
            //console.log('235 enqueing q.len: ', this._q.length);

            //is val < or > root.value
            if(value < root.value){
                //search left
                node =  this.depth(root.leftSubNode, value);
               // this._q.dequeue();  
               // console.log('242 dequeing l q.len: ', this._q.length);            
            }else{
                //search right
                 node = this.depth(root.rightSubNode, value);
                //this._q.dequeue();
                //console.log('247 dequeing r q.len: ', this._q.length); 
            }   
        }
       // console.log('250 returning');
       // console.log('251 dequeing  q.len: ', this._q.length);
       //copyQ = JSON.parse(JSON.stringify(this._q));
       //console.log('256 copy: ',copyQ,', org: ', this._q);
       //console.log('256 returning q.len: ', this._q.length );
       //this._q = {};
       //return copyQ.length;
       //console.log('ret at 269');
       return this._q.length;
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
    //recursive delete(root, value) with initial call to root = this._root
    delete (root, value) {
        //this._q.empty();
        let subArray = [];
        let callback = (root)=> {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
            this._q.enqueue(root);
            console.log('cb->pushing root ',root.value, ', to queue');
            console.log('q: ',this._q);
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
        }
        console.log('root.value: ',root.value,', value: ',value);
        //is root.value === value
        if(value === root.value){
            console.log('at equates: ',value);
            //action delete root
            if (root.hasChild){
                console.log('yes ', root.value,' has child');
                console.log('calling callback on root ',root.value);
                this.inOrder(root, callback);
                return;
            }else{
                //just delete it by resetting prior subNode address to null
                console.log('------------dequeing-------------------------');
                root = this._q.dequeue();
                root.leftSubNode = null;
                root.rightSubNode = null;
                console.log('------------dequeing-------------------------');
                return;
            }
        }else{
            //does root have children
            if (root.hasChild){
                //enque (save) this node
                console.log('*****************************************');
                console.log('*pushing root ',root.value, ', to queue*');
                this._q.enqueue(root);
                console.log('q: ',this._q);
                console.log('*****************************************');
                //go left or right?
                if(value < root.value){
                    //go left
                    root = root.leftSubNode;
                    this.delete(root, value);
                }else{
                    //go right
                    root = root.rightSubNode;
                    this.delete(root, value);
                }
            }else{
                //no children
                //do ??
                return;
            }
        }
        //here if all subNodes below value to delete have been queued
        //console.log('this: ', this);
        console.log('341: queue length: ',this._q.length);
        console.log('head of queue: ', this._q.peek());
        //transfer values from queue to array
        //first remove head node which is attachment point for deleted node
        let att_node = this._q.dequeue()
        let attach = this.find(this.root, att_node.value);
        console.log('346: attach: ', attach);
        attach.rightSubNode = null;
        console.log('348: attach: ', attach);
        const qLen = this._q.length;
        for(let i = 0; i < qLen; i++){
            console.log('i: ',i);
            let toPush = this._q.dequeue();
            if(!(toPush.value === value )){
                console.log('toPush-value: ',toPush.value);
                subArray.push(toPush.value);
            }
            //console.log('349: queue length: ',this._q.length);
        }
        //then clean the queue;
        this._q.empty();
        console.log('subArray: ',subArray);
        //===============================================================
        let newTree = createBalancedBinarySearchTree (subArray);
        newTree.prettyPrint();
        //==============================================================
        console.log('364: attach: ', attach);
        //which subNode of attachment node to attach to
        if(attach.value < newTree.root.value){
            //attach at rightSubNode of attach
            attach.rightSubNode = newTree.root;
            console.log('369: attach: ', attach);
        }else{
            //attach at leftSubNode of attach
            attach.leftSubNode = newTree.root;
            console.log('373: attach: ', attach);
        }

        return this;
    }

    /*
        Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.  
    */
    height (root, value) {
        let treeHeight = this.heightMax(root);
        //console.log('heightMax: ', treeHeight);
        this._q.empty();
        let nodeDepth = this.depth(root, value);
        //console.log('nodeDepth: ',nodeDepth);
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
        //console.log('hasChild: ',hasChild);
        if (hasChild){
            height++;
            //console.log('316: height',height);
            switch (hasChild) {
                case 'both': {
                        l_height = height;
                        l_height += this.heightMax(root.leftSubNode);
                        //console.log('321: l_height',l_height);
                        max = l_height > max ? l_height : max;
                        r_height = height;
                        r_height += this.heightMax(root.rightSubNode);
                        //console.log('325: r_height',r_height);
                        max = r_height > max ? r_height : max
                        //console.log('327 Max: ',max);
                    break;
                }
                case 'left': {
                        l_height = height;
                        l_height += this.heightMax(root.leftSubNode);
                        //console.log('332: l_height',l_height);
                        max = l_height > max ? l_height : max;
                        //console.log('335 Max: ',max);
                    break;
                }
                case 'right': {
                        r_height = height;
                        r_height += this.heightMax(root.rightSubNode);
                        //console.log('339: r_height',r_height);
                        max = r_height > max ? r_height : max
                        //console.log('343 Max: ',max);
                    break;
                }
            }
                
        }
        //console.log('349 returning Max: ',max);
        return max;
    }
   

    /*
        isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
    */
    //Confirm that the tree is balanced by calling isBalanced.
    isBalanced (root) {
        //assume tree balanced then check
        let isBalanced = true;
        //use this.levelOrder(root, callback_1) where callback_1 checks each node for depth of it's sub nodes
        //check depth of sub nodes
        //recursively check depth of each of this nodes sub-nodes by using this.preOrder(root, callback_2)
        //where callback_2 checks each subNode for hasChild and counts each yes comparing left with right
        //if > 1 then out of balance

        //ensure queue is empty to start
        this._q.empty();

        let callback_1 = (root) =>{
            let leftCount = 0;
            let rightCount = 0;

            let callback_2 = (root => {
                if(root.leftSubNode){
                    leftCount++;
                    this.preOrder(root.leftSubNode,callback_2);
                }
                if(root.rightSubNode){
                    rightCount++;
                    this.preOrder(root.rightSubNode,callback_2);
                }
            });

            this.preOrder(root,callback_2);
            if( ((leftCount - rightCount) > 1)  || ( (rightCount - leftCount > 1)) ) {
                console.log('tree unbalanced at root', root.value );
                isBalanced = false;
            } 

            return;   
        }

        this.levelOrder(root, callback_1);

        return isBalanced;
    }

    /*
        Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
        returns a new balanced tree
    */
   
    reBalance (root) {
        let newTree = null;
        //ensure queue is empty to start (IF USED)
        this._q.empty();
        //array to collect nodes
        let nodeArray = [];

        let callback = (root) =>{nodeArray.push(root.value);}

        //inOrder traversal to collect nodes for new array thence new tree
        this.inOrder(root, callback);

        console.log(nodeArray);
       // ensure array sorted low -> high
        const sortedArray = nodeArray.sort(function(a, b){return a - b});

        newTree = new Tree(sortedArray);

        //newTree.prettyPrint()
        return newTree;
    }







    /*
        levelOrder function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    */
   levelOrder (node, callback ) {
        try{
            if(callback === undefined) {throw "callback function needed";}
            //let node = this.root;
            if( (node === null )|| (node === undefined) ){
                //used at only one subNode
                //console.log('390: returning');
                return;
            }
           // console.log('391: node',node);
           // console.log('node val: ',node.value);     //06/11/24
            //callback;
            callback(node);                             //06/11/24
            if(node.hasChild()){
                this._q.enqueue(node.leftSubNode);
                this._q.enqueue(node.rightSubNode);

               // console.log('peek: ',this._q.peek().value);

               // console.log('q1: ',this._q.dequeue().value);
               // console.log('q2: ',this._q.dequeue().value);

                this.levelOrder(this._q.dequeue(), callback);   //left
                this.levelOrder(this._q.dequeue(), callback);   //right
            }else{
                //console.log('407: returning');
                return;
            }
            //return;
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
                //console.log('439: returning');
                return;
            }
            //record visit to node
            if(!(visited.includes(node.value))) {visited.push(node.value);}
            //console.log('At node val: ',node.value);
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
                console.log('587:enqueue: ', node.value);
                this._q.enqueue(node);
                //go left     
                this.inOrder(left, callback);
                }
                else{
                    //else ??
                }
                //console.log('*node value: ', node.value);
                callback(node);
                //if new right      
                if(!(visited.includes(right))) {
                    //go right          
                    this.inOrder(right, callback);
                }else{
                    //else
                    //pop address
                    node = this._q.dequeue();
                    console.log('605:dequeue: ', node.value);
                    //go address 
                    this.inOrder(node, callback);
                }

            }else{
                //has child response 0;
                //console.log('node value*: ', node.value);
                callback(node);
                //console.log('407: returning');
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
           // let visited = []
            let left;
            let right;
            let child;   //to node.hasChild() ?
            try{
                if(callback === undefined) {throw "callback function needed";}
                
                if( (node === null )|| (node === undefined) ){
                    //used at only one subNode ?
                    //console.log('533: returning');
                    return;
                }
                
                //record visit to node
               // if(!(visited.includes(node.value))) {visited.push(node.value);}
                //processing node here
               // console.log('*processing node: ',node.value);
                callback(node);                            //06/11/24
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
        Postorder (root -> left)
        Postorder (root -> right)
        Process root (For example, print(root->data))
    */
    postOrder (node, callback) {
       // let processed = [];
        let left;
        let right;
        let child;   //to node.hasChild() ?
        try{
            if(callback === undefined) {throw "callback function needed";}
            
            if( (node === null )|| (node === undefined) ){
                console.log('609: returning');
                return;
            }
           // let result = prompt("hit key to continue: ");
            //if(result === 'q'){throw 99;}
            //console.log('** ',node.value,' **');
            this._q.enqueue(node.value);
            //visited.push(root);
            if(child = node.hasChild()){
                //console.log('root ',root);
                //console.log('has child');
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
                                    //console.log('l ',left.value);
                                   // console.log('l- ',left.value);
                                   callback(left);                      //07/11/24
                                   // processed.push(this._q.dequeue());
                                    this._q.dequeue();
                                    right = node.rightSubNode;
                                    this.postOrder(right, callback);
                                    //console.log('r ',right.value);
                                    //console.log('r- ',right.value);
                                    callback(right);                    //07/11/24
                                   // processed.push(this._q.dequeue());
                                    this._q.dequeue();
                                    //console.log('q.len: ',this._q.length);
                                    //process the topmost root
                                    if(this._q.length === 1){
                                        this._q.dequeue();
                                       // console.log('n- ',node.value);  
                                        callback(node);                   //07/11/24
                                    }                                   //05/11/24
                                    return;
                        break;
                    }
                    case 'left': {
                                    left = node.leftSubNode;
                                    this.postOrder(left, callback);
                                    right = null;
                                    //console.log('* ',left.value);
                                   // console.log('ll- ',left.value);
                                    callback(left);                     //07/11/24
                                    // processed.push(this._q.dequeue());
                                    this._q.dequeue();
                                    return;
                        break;
                    }
                    case 'right': {
                                    left = null;
                                    right = node.rightSubNode;
                                    this.postOrder(right, callback);
                                    //console.log('2,5,8 ',right.value);
                                   // console.log('rr- ',right.value);
                                    callback(right);                        //07/11/24
                                    // processed.push(this._q.dequeue());
                                    this._q.dequeue();
                                    return;
                        break;
                    }
                    default: {
                        throw 'Error at switch child';
                    }
                } 
                //xx process node here
                //console.log('processing node: ', node.value);
            }else{
                //console.log('No child');
                //this.postOrder(node, callback);
                //console.log('processing node: ', node.value);
                //console.log('* ', node.value);
                //xxconsole.log('root ',root);
                return;
            }
            console.log('#####');
        }
        catch(error){
            console.log(error);
            process.exit(0);
        }
        //xxconsole.log('root ',root);
    }

}

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

export {Tree}