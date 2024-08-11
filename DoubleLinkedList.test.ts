import { DoubleLinkedList } from './DoubleLinkedList';

describe('DoubleLinkedList', () => {
    let list: DoubleLinkedList<number>;

    beforeEach(() => {
        list = new DoubleLinkedList<number>();
    });

    test('should allow adding an element to the end', () => {
        list.appendLast(3);
        expect(list.getLast()?.value).toBe(3);
        expect(list.size).toBe(1);
    });

    test('should allow adding an element to the beginning', () => {
        list.appendFirst(3);
        expect(list.getFirst()?.value).toBe(3);
        expect(list.size).toBe(1);
    });

    test('should allow removing an element from the beginning', () => {
        list.appendFirst(3);
        list.appendFirst(4);
        list.removeFirst();
        expect(list.getFirst()?.value).toBe(3);
        expect(list.size).toBe(1);
    });

    test('should allow removing an element from the end', () => {
        list.appendLast(3);
        list.appendLast(4);
        list.removeLast();
        expect(list.getLast()?.value).toBe(3);
        expect(list.size).toBe(1);
    });

    test('should return the first element', () => {
        list.appendFirst(3);
        list.appendFirst(4);
        expect(list.getFirst()?.value).toBe(4);
    });

    test('should return the last element', () => {
        list.appendLast(3);
        list.appendLast(4);
        expect(list.getLast()?.value).toBe(4);
    });

    test('should return null if the list is empty', () => {
        expect(list.getFirst()).toBeNull();
        expect(list.getLast()).toBeNull();
        expect(list.size).toBe(0);
    });

})