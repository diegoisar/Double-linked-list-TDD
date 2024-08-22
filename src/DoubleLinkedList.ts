class Node<T> {
    private isDeleted: boolean = false

    constructor(value: T) {
        this._value = value
        this.isDeleted = false
    }

    private _value: T

    public get value(): T {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        return this._value
    }

    public set value(value: T) {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        this._value = value
    }

    protected _next?: Node<T>

    public get next(): Node<T> | undefined {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        return this._next
    }

    public set next(node: Node<T> | undefined) {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        this._next = node
    }

    protected _prev?: Node<T>

    public get prev(): Node<T> | undefined {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        return this._prev
    }

    public set prev(node: Node<T> | undefined) {
        if (this.isDeleted) {
            throw new Error('Node has been deleted')
        }
        this._prev = node
    }

    public delete(): void {
        if (this._prev) {
            this._prev._next = this.next
        }
        if (this._next) {
            this._next._prev = this.prev
        }
        this.isDeleted = true
    }
}

export class DoubleLinkedList<T> {
    private first?: Node<T>
    private last?: Node<T>
    private _size: number = 0

    public get size(): number {
        return this._size
    }

    public appendFirst(value: T): void {
        const newNode = new Node<T>(value)
        if (this.first) {
            newNode.next = this.first
            this.first.prev = newNode
        } else {
            this.last = newNode
        }
        this.first = newNode
        this._size++
    }

    public appendLast(value: T): void {
        const newNode = new Node<T>(value)
        if (this.last) {
            newNode.prev = this.last
            this.last.next = newNode
        } else {
            this.first = newNode
        }
        this.last = newNode
        this._size++
    }

    public removeFirst(): void {
        if (this.first) {
            if (this.first.next) {
                this.first.next.prev = undefined
            }
            const next = this.first.next
            this.first.delete()
            this.first = next
            this._size--
            if (this._size === 0) {
                this.last = undefined
            }
        }
    }

    public removeLast(): void {
        if (this.last) {
            if (this.last.prev) {
                this.last.prev.next = undefined
            }
            const prev = this.last.prev
            this.last.delete()
            this.last = prev
            this._size--
            if (this._size === 0) {
                this.first = undefined
            }
        }
    }

    public getFirst(): Readonly<Node<T>> | undefined {
        return this.first
    }

    public getLast(): Readonly<Node<T>> | undefined {
        return this.last
    }

    public insertAt(index: number, value: T): void {
        if (index < 0 || index > this._size) {
            throw new Error('Index out of bounds')
        }
        if (index === 0) {
            this.appendFirst(value)
            return
        }
        if (index === this._size) {
            this.appendLast(value)
            return
        }
        let node = this.first
        let count = 0
        while (node && count < index) {
            node = node.next
            count++
        }
        if (!node) {
            return
        }
        const newNode = new Node<T>(value)
        newNode.next = node
        newNode.prev = node.prev
        if (node.prev) {
            node.prev.next = newNode
        }
        node.prev = newNode
        this._size++
    }

    public removeAt(index: number): void {
        if (index < 0 || index >= this._size) {
            throw new Error('Index out of bounds')
        }
        if (index === 0) {
            this.removeFirst()
            return
        }
        if (index === this._size - 1) {
            this.removeLast()
            return
        }
        let node = this.first
        let count = 0
        while (node && count < index) {
            node = node.next
            count++
        }
        if (!node) {
            return
        }
        node.delete()
        this._size--
    }

    public split(index: number): DoubleLinkedList<T> {
        let node = this.first
        let count = 0
        while (node && count < index) {
            node = node.next
            count++
        }
        if (!node) {
            return new DoubleLinkedList<T>()
        }
        const newList = new DoubleLinkedList<T>()
        newList.first = node
        newList.last = this.last
        this.last = node.prev
        node.prev = undefined
        if (this.last) {
            this.last.next = undefined
        }
        this._size -= count
        newList._size = count
        return newList
    }

    public concat(list: DoubleLinkedList<T>): void {
        if (!list.size) {
            return
        }
        if (!this.first) {
            this.first = list.first
        }
        if (this.last) {
            this.last.next = list.first
        }
        if (list.first) {
            list.first.prev = this.last
        }
        this.last = list.last
        this._size += list.size
    }
}
