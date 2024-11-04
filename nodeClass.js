/*
    Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
*/

//A Node class, containing a value property and a leftNode property and a rightNode property
//both set as null by default.

class Node {
    //private variables
    _value = null;              //the object data
    _leftSubNode = null;        //the leftSubNode (data?)
    _rightSubNode = null;       //the rightSubNode (data?)

    //constructor
    constructor (value) {
        //cater for incorrect invocation i.e not using 'new' keyword
        if(!(this instanceof Node)) {
            //throw error:
            throw Error('Error: Incorrect invocation needs new key word');
            //or
            // return new Node(value);
        }else{
         //the node
         this._value = value;                   //node content             
       }
    }

    //class getters & setters
    get value () {
        return this._value; 
    }
    set value (value) {
        this._value = value; 
    }
    get leftSubNode () {
        return this._leftSubNode; 
    }
    set leftSubNode (leftSubNode) {
        this._leftSubNode = leftSubNode; 
    }

    get rightSubNode () {
        return this._rightSubNode; 
    }
    set rightSubNode (rightSubNode) {
        this._rightSubNode = rightSubNode; 
    }

    //class method
    logNode () {
        console.log('      | ');
        console.log('    (',this.value,') ');
        console.log('  v---^---v    ')
        console.log('(',this.leftSubNode.value,')',' ','(', this.rightSubNode.value, ')' ); //04/11/24
    }

    hasChild (){
        //if so returns left, right, both  (or false if not)
        let both = 0;
        if(!(this.leftSubNode === null)){
            //console.log('left: ',this.leftSubNode.value);
            both += 1;
        }
        if(!(this.rightSubNode === null)){
            //console.log('right: ',this.rightSubNode.value);
            both += 2;
        }
        switch(both){
            case 0: { return false; }
            case 1: { return 'left';}
            case 2: { return 'right';}
            case 3: { return 'both';}
            break;
        }
    }

}
export {Node}