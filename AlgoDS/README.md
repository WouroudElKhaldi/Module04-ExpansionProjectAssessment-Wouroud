# DS & Algo assessment


## **Ex 1: Bubble Sort**

Given an Integer **N** and a list **arr**. Sort the array using bubble sort algorithm.

**Example 1:**

```
Input:
N = 5
arr[] = {4, 1, 3, 9, 7}
Output:
1 3 4 7 9

```

**Example 2:**

```
Input:
N = 10
arr[] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1}
Output:
1 2 3 4 5 6 7 8 9 10

```

## **Ex 2: Binary Search**

Given a sorted array of size **N** and an integer **K**, find the position(0-based indexing) at which **K** is present in the array using binary search.

**Example 1:**

```
Input:
N = 5
arr[] = {1 2 3 4 5}
K = 4

Output: 3
Explanation: 4 appears at index 3.
```

**Example 2:**

```
Input:
N = 5
arr[] = {11 22 33 44 55}
K = 445

Output: -1
Explanation: 445 is not present.
```

**Your Task:**  You dont need to read input or print anything. Complete the function **binarysearch()** which takes **arr[]**, **N** and **K** as input parameters and returns the index of **K** in the array. If **K** is not present in the array, return -1.


## **Ex 3: Implement a Basic Linked List**

**Instructions::**

1. Node Creation:
- Create a function createNode(value) that takes a value and returns an object representing a node.
- The node object should have properties for value and next, with next initially set to null.

2. Linked List Creation:
- Create a function createLinkedList() that initializes an empty linked list and returns it.
- The linked list can be represented as a closure, where an internal variable stores the reference to the head node.

3. Adding Nodes:
- Implement a function addNode(linkedList, value) that adds a new node with the given value to the end of the linked list.
- Ensure that the function handles the case when the linked list is initially empty.

4. Printing the Linked List:
- Implement a function printList(linkedList) that prints the elements of the linked list.
- The output format can be a space-separated string of values.

**Example:**
```
// Creating a linked list
const myLinkedList = createLinkedList();

// Adding nodes
myLinkedList = addNode(myLinkedList, 3);
myLinkedList = addNode(myLinkedList, 7);
myLinkedList = addNode(myLinkedList, 10);

// Printing the linked list
console.log(printList(myLinkedList));
The expected output should be:

3 7 10
```

**Bonus:**
- Implement a function removeNode(linkedList, value) to remove a node with the given value from the linked list.
- Create a function search(linkedList, value) to check if a specific value exists in the linked list.
