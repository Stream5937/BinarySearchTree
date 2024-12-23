class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }

    empty() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }

    get length() {
      return this.tail - this.head;
    }
    
    get isEmpty() {
      return this.length === 0;
    }
    
}

export {Queue}
//------------------------------------------------------
/*
  //test queue
  let q = new Queue();
  for (let i = 1; i <= 7; i++) {
    q.enqueue(i);
  }
  // get the current item at the front of the queue
  console.log(q.peek()); // 1
  
  // get the current length of queue
  console.log(q.length); // 7
  
  // dequeue all elements
  while (!q.isEmpty) {
    console.log(q.dequeue());
  }
    */
//------------------------------------------------------