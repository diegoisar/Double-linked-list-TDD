class Node<T>{
    value: T;
    next: Node<T> | null = null;
    prev: Node<T> | null = null;
}

export class DoubleLinkedList<T>{
    public first: Node<T> | null = null;
    public last: Node<T> | null = null;
    public size: number = 0;

    public appendFirst(value: T): void {}

    public appendLast(value: T): void {}

    public removeFirst(): void {}

    public removeLast(): void {}

    public getFirst(): Node<T>| null { return this.first; }

    public getLast(): Node<T> | null { return this.last; }
}