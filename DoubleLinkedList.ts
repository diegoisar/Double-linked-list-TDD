class Node<T>{
    public value: T;
    public next: Node<T> | null = null;
    public prev: Node<T> | null = null;

    constructor(value: T){
        this.value = value;
    }
}

export class DoubleLinkedList<T>{
    private first: Node<T> | null = null;
    private last: Node<T> | null = null;
    private _size: number = 0;

    public get size(): number { return this._size; }

    public appendFirst(value: T): void {
        const newNode = new Node<T>(value);
        if(this.first){
            newNode.next = this.first;
            this.first.prev = newNode;
        }
        else{
            this.last = newNode;
        }
        this.first = newNode;
        this._size++;
    }

    public appendLast(value: T): void {
        const newNode = new Node<T>(value);
        if(this.last){
            newNode.prev = this.last;
            this.last.next = newNode;
        }
        else{
            this.first = newNode;
        }
        this.last = newNode;
        this._size++;
    }

    public removeFirst(): void {
        if(this.first){
            this.first = this.first.next;
            this._size--;
        }
    }

    public removeLast(): void {
        if(this.last){
            this.last = this.last.prev;
            this._size--;
        }
    }

    public getFirst(): Node<T>| null { return this.first; }

    public getLast(): Node<T> | null { return this.last; }
}