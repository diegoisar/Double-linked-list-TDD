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

    test('should allow adding multiple elements', () => {
        list.appendFirst(3);
        list.appendLast(4);
        list.appendFirst(5);
        expect(list.getFirst()?.value).toBe(5);
        expect(list.getLast()?.value).toBe(4);
        expect(list.size).toBe(3);
        expect(list.getFirst()?.next?.value).toBe(3);
        expect(list.getLast()?.prev?.value).toBe(3);
    })

    test('should allow removing an element from the beginning', () => {
        list.appendLast(3);
        list.appendLast(4);
        list.removeFirst();
        expect(list.getFirst()?.value).toBe(4);
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

    test('should be able to iterate all the element forward', () => {
        for (let i = 0; i < 5; i++) {
            list.appendLast(i);
        }
        const getValues = [];
        let current = list.getFirst();
        while(current){
            getValues.push(current.value);
            current = current.next;
        }
        expect(getValues).toEqual([0, 1, 2, 3, 4]);

        for (let i = 0; i < 5; i++) {
            list.appendFirst(i);
        }
        const getValues2 = [];
        let current2 = list.getFirst();
        while(current2){
            getValues2.push(current2.value);
            current2 = current2.next;
        }
        expect(getValues2).toEqual([4, 3, 2, 1, 0, 0, 1, 2, 3, 4]);
    })

    test ('should be able to iterate all the element backward', () => {
        for (let i = 0; i < 5; i++) {
            list.appendLast(i);
        }
        const getValues = [];
        let current = list.getLast();
        while(current){
            getValues.push(current.value);
            current = current.prev;
        }
        expect(getValues).toEqual([4, 3, 2, 1, 0]);

        for (let i = 0; i < 5; i++) {
            list.appendFirst(i);
        }
        const getValues2 = [];
        let current2 = list.getLast();
        while(current2){
            getValues2.push(current2.value);
            current2 = current2.prev;
        }
        expect(getValues2).toEqual([4, 3, 2, 1, 0, 0, 1, 2, 3, 4]);
    })

})