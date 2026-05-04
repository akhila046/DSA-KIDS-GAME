export const quizData = {
  stack: [
    { question: "What does LIFO stand for?", options: ["Last In First Out","Last In Final Order","Linear In First Out","List In First Out"], answer: 0, explanation: "Stack follows Last In First Out." },
    { question: "Which operation adds an element to a stack?", options: ["enqueue","push","insert","add"], answer: 1, explanation: "push() adds to the top of the stack." },
    { question: "What happens when you pop from an empty stack?", options: ["Returns null","Stack overflow","Stack underflow","Nothing"], answer: 2, explanation: "Popping from empty stack causes Stack Underflow." },
    { question: "Time complexity of push and pop?", options: ["O(n)","O(log n)","O(1)","O(n2)"], answer: 2, explanation: "Both push and pop are O(1)." },
    { question: "Which real-world example uses a stack?", options: ["Printer queue","Browser back button","Ticket counter","Checkout"], answer: 1, explanation: "Browser back button uses a stack." }
  ],
  queue: [
    { question: "What does FIFO stand for?", options: ["First In Final Out","First In First Out","Fast In Fast Out","Fixed In Fixed Out"], answer: 1, explanation: "Queue follows First In First Out." },
    { question: "Which operation adds to a queue?", options: ["push","insert","enqueue","append"], answer: 2, explanation: "enqueue() adds to the back." },
    { question: "Which operation removes from a queue?", options: ["pop","dequeue","delete","remove"], answer: 1, explanation: "dequeue() removes from the front." },
    { question: "Where is a new element added in a queue?", options: ["Front","Middle","Back","Random"], answer: 2, explanation: "New elements go to the back." },
    { question: "Real-world use of a queue?", options: ["Undo in editor","Call center waiting","Browser history","Recursion"], answer: 1, explanation: "Call centers use queues." }
  ],
  array: [
    { question: "Index of the first element in an array?", options: ["1","-1","0","Depends"], answer: 2, explanation: "Arrays are zero-indexed." },
    { question: "Time complexity of accessing by index?", options: ["O(n)","O(log n)","O(1)","O(n2)"], answer: 2, explanation: "Array access by index is O(1)." },
    { question: "Time complexity of searching unsorted array?", options: ["O(1)","O(log n)","O(n)","O(n log n)"], answer: 2, explanation: "Linear search is O(n)." },
    { question: "What happens when inserting at beginning of array?", options: ["O(1) operation","All elements shift right","Array doubles","Nothing"], answer: 1, explanation: "Inserting at beginning shifts all elements right." },
    { question: "Which has fixed size in most languages?", options: ["Linked List","Dynamic Array","Static Array","Queue"], answer: 2, explanation: "Static arrays have fixed size." }
  ],
  tree: [
    { question: "In a BST, where do smaller values go?", options: ["Right subtree","Left subtree","Root","Random"], answer: 1, explanation: "Smaller values go to the left subtree." },
    { question: "Which traversal gives sorted output from BST?", options: ["Preorder","Postorder","Inorder","Level order"], answer: 2, explanation: "Inorder traversal gives sorted output." },
    { question: "Average time complexity of BST search?", options: ["O(1)","O(n)","O(log n)","O(n2)"], answer: 2, explanation: "Average BST search is O(log n)." },
    { question: "What is a leaf node?", options: ["Root node","Node with two children","Node with no children","Node with one child"], answer: 2, explanation: "A leaf node has no children." },
    { question: "What is the root of a tree?", options: ["Last node","Any node","Topmost node","Leftmost node"], answer: 2, explanation: "Root is the topmost node." }
  ],
  linkedlist: [
    { question: "What does each node in a linked list contain?", options: ["Only data","Only a pointer","Data and pointer to next","An index"], answer: 2, explanation: "Each node stores data and a pointer to next." },
    { question: "Time complexity of inserting at head?", options: ["O(n)","O(log n)","O(1)","O(n2)"], answer: 2, explanation: "Head insertion is O(1)." },
    { question: "Time complexity of searching in linked list?", options: ["O(1)","O(log n)","O(n)","O(n2)"], answer: 2, explanation: "Must traverse from head - O(n)." },
    { question: "What does the last node point to?", options: ["Head","Itself","NULL","Previous node"], answer: 2, explanation: "Last node points to NULL." },
    { question: "Advantage of linked list over array?", options: ["Faster access","Dynamic size","Less memory","Random access"], answer: 1, explanation: "Linked lists grow and shrink dynamically." }
  ],
  graph: [
    { question: "Two main components of a graph?", options: ["Arrays and pointers","Nodes and edges","Keys and values","Rows and columns"], answer: 1, explanation: "A graph has vertices (nodes) and edges." },
    { question: "What data structure does BFS use?", options: ["Stack","Queue","Array","Tree"], answer: 1, explanation: "BFS uses a Queue." },
    { question: "What data structure does DFS use?", options: ["Queue","Heap","Stack","Array"], answer: 2, explanation: "DFS uses a Stack." },
    { question: "Time complexity of BFS and DFS?", options: ["O(V)","O(E)","O(V + E)","O(V * E)"], answer: 2, explanation: "Both are O(V + E)." },
    { question: "Which traversal explores all neighbors before going deeper?", options: ["DFS","BFS","Inorder","Postorder"], answer: 1, explanation: "BFS explores level by level." }
  ]
}
