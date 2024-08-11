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
    public size: number = 0;

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
        this.size++;
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
        this.size++;
    }

    public removeFirst(): void {
        if(this.first){
            this.first = this.first.next;
            this.size--;
        }
    }

    public removeLast(): void {
        if(this.last){
            this.last = this.last.prev;
            this.size--;
        }
    }

    public getFirst(): Node<T>| null { return this.first; }

    public getLast(): Node<T> | null { return this.last; }
}