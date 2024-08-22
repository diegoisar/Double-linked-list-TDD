import { DoubleLinkedList } from './DoubleLinkedList'

const list = new DoubleLinkedList<number>()
for (let i = 0; i < 1000000; i++) {
    list.appendLast(i)
    list.removeFirst()
}
