// exercice 1
const bubbleSort = (N, arr) => {
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

console.log(bubbleSort(5, [4, 1, 3, 9, 7]));
console.log(bubbleSort(10, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

// exercice2
const binarySearch = (N, arr, K) => {
  let low = 0, high = N - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === K) return `number ${K} is found at index ${mid}`;
    else if (arr[mid] < K) low = mid + 1;
    else high = mid - 1;
  }
  return "Not Found";
};

console.log(binarySearch(5, [1, 2, 3, 4, 5], 4));
console.log(binarySearch(5, [11, 22, 33, 44, 55], 445));

// exercice 3
function createNode(data) {
  return {
    data: data,
    next: null,
  };
}

function createLinkedList() {
  return {
    head: null,

    append(data) {
      const newNode = createNode(data);

      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    },

    remove(data) {
      if (!this.head) {
        return;
      }

      if (this.head.data === data) {
        this.head = this.head.next;
        return;
      }

      let current = this.head;
      while (current.next && current.next.data !== data) {
        current = current.next;
      }

      if (current.next) {
        current.next = current.next.next;
      }
    },

    display() {
      let current = this.head;
      let displayString = "";

      while (current) {
        displayString += current.data;
        if (current.next) {
          displayString += " -> ";
        }
        current = current.next;
      }

      console.log(displayString);
    },

    search(searchValue) {
      let current = this.head;
      let index = 0;
      while (current !== null) {
        if (current.data === searchValue) {
          return `number ${searchValue} is found at index ${index}`;
        }
        current = current.next;
        index++;
      }
      return `number ${searchValue} is not found`;
    },
  };
}

const myList = createLinkedList();
myList.append(1);
myList.append(2);
myList.append(3);
myList.append(4);
myList.append(5);
myList.append(6);
myList.append(7);

console.log("Original List:");
myList.display();

myList.remove(2);
myList.remove(6);
console.log("\nList after removing 2 and 6:");
myList.display();
console.log(myList.search(4));
