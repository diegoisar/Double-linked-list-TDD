class Node<T> {
  public value: T;
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoubleLinkedList<T> {
  private first: Node<T> | null = null;
  private last: Node<T> | null = null;
  private _size: number = 0;

  public get size(): number {
    return this._size;
  }

  public appendFirst(value: T): void {
    const newNode = new Node<T>(value);
    if (this.first) {
      newNode.next = this.first;
      this.first.prev = newNode;
    } else {
      this.last = newNode;
    }
    this.first = newNode;
    this._size++;
  }

  public appendLast(value: T): void {
    const newNode = new Node<T>(value);
    if (this.last) {
      newNode.prev = this.last;
      this.last.next = newNode;
    } else {
      this.first = newNode;
    }
    this.last = newNode;
    this._size++;
  }

  public removeFirst(): void {
    if (this.first) {
      if (this.first.next) {
        this.first.next.prev = null;
      }
      this.first = this.first.next;
      this._size--;
    }
  }

  public removeLast(): void {
    if (this.last) {
      if (this.last.prev) {
        this.last.prev.next = null;
      }
      this.last = this.last.prev;
      this._size--;
    }
  }

  public getFirst(): Readonly<Node<T>> | null {
    return this.first;
  }

  public getLast(): Readonly<Node<T>> | null {
    return this.last;
  }

  public insert(index: number, value: T): void {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      this.appendFirst(value);
      return;
    }
    if (index === this._size) {
      this.appendLast(value);
      return;
    }
    let node = this.first;
    let count = 0;
    while (node && count < index) {
      node = node.next;
      count++;
    }
    if (!node) {
      return;
    }
    const newNode = new Node<T>(value);
    newNode.next = node;
    newNode.prev = node.prev;
    if (node.prev) {
      node.prev.next = newNode;
    }
    node.prev = newNode;
    this._size++;
  }
  public remove(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }
    if (index === 0) {
      this.removeFirst();
      return;
    }
    if (index === this._size - 1) {
      this.removeLast();
      return;
    }
    let node = this.first;
    let count = 0;
    while (node && count < index) {
      node = node.next;
      count++;
    }
    if (!node) {
      return;
    }
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    this._size--;
  }

  public split(index: number): DoubleLinkedList<T> {
    let node = this.first;
    let count = 0;
    while (node && count < index) {
      node = node.next;
      count++;
    }
    if (!node) {
      return new DoubleLinkedList<T>();
    }
    const newList = new DoubleLinkedList<T>();
    newList.first = node;
    newList.last = this.last;
    this.last = node.prev;
    node.prev = null;
    if (this.last) {
      this.last.next = null;
    }
    this._size -= count;
    newList._size = count;
    return newList;
  }

  public concat(list: DoubleLinkedList<T>): void {
    if (!list.size) {
      return;
    }
    if (!this.first) {
      this.first = list.first;
    }
    if (this.last) {
      this.last.next = list.first;
    }
    if (list.first) {
      list.first.prev = this.last;
    }
    this.last = list.last;
    this._size += list.size;
  }
  // const {first, last} = list.split(stop: 2, start: 1)
}
