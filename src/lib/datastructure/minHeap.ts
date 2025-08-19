import { BOARD_ROWS, BOARD_COLS } from "@/lib/utils/constants";

const TOTAL_SIZE = BOARD_ROWS * BOARD_COLS;

export class MinHeap <T>{
  private arr: (T | null)[];
  private size: number;
  private compare: (a: T, b: T) => number;

  constructor(compare?: (a: T, b: T) => number, capacity: number = TOTAL_SIZE) {
    this.arr = new Array(capacity + 1).fill(null)
    this.size = 0;

    // default comparator: works for numbers
    this.compare = compare ?? ((a: any, b: any) => a - b);
  };

  private swap(i: number, j: number) {
    const temp = this.arr[i]!;
    this.arr[i] = this.arr[j]!;
    this.arr[j] = temp;
  }

  private heapify(index: number) {
    const left = Math.floor(2 * index);
    const right = Math.floor(2 * index + 1);
    let smallest = index;

    if(left <= this.size &&
      this.compare(this.arr[left]!, this.arr[smallest]!) < 0 ) {
        smallest = left;
    }
    if(right <= this.size &&
      this.compare(this.arr[right]!, this.arr[smallest]!) < 0) {
        smallest = right;
      }

    if(smallest === index) return;
    this.swap(smallest, index);
    this.heapify(smallest);
  }

  add(val: T) {

    this.size++;
    let index = this.size;
    this.arr[index] = val;

    while(index > 1) {
      const parent = Math.floor(index / 2);
      
      if(this.compare(this.arr[index]!, this.arr[parent]!) < 0) {
        this.swap(index, parent);
        index = parent;
      } 
      else break;
    }
  };

  top(): T | null {
    return this.size > 0 ? this.arr[1]! : null;
  };
  
  remove() {
    if(this.size === 0) return null;
    this.arr[1] = this.arr[this.size]!;
    this.size--;

    this.heapify(1);
  };

  pop() : T | null {
    if(this.isEmpty()) return null;
    const val = this.top();
    this.remove();
    return val;
  }

  isEmpty(): boolean {
    return this.size === 0;
  };
};