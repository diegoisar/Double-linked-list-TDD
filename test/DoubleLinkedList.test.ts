import { DoubleLinkedList } from '../src/DoubleLinkedList'
import _ from 'lodash'

describe('DoubleLinkedList', () => {
    let list: DoubleLinkedList<number>

    beforeEach(() => {
        list = new DoubleLinkedList<number>()
    })

    test('should allow adding an element to the end', () => {
        list.appendLast(3)
        expect(list.getLast()?.value).toBe(3)
        expect(list.size).toBe(1)
    })

    test('should allow adding an element to the beginning', () => {
        list.appendFirst(3)
        expect(list.getFirst()?.value).toBe(3)
        expect(list.size).toBe(1)
    })

    test('should allow adding multiple elements', () => {
        list.appendFirst(3)
        list.appendLast(4)
        list.appendFirst(5)
        expect(list.getFirst()?.value).toBe(5)
        expect(list.getLast()?.value).toBe(4)
        expect(list.size).toBe(3)
        expect(list.getFirst()?.next?.value).toBe(3)
        expect(list.getLast()?.prev?.value).toBe(3)
    })

    test('should allow removing an element from the beginning', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.removeFirst()
        expect(list.getFirst()?.value).toBe(4)
        expect(list.size).toBe(1)
    })

    test('should allow removing an element from the end', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.removeLast()
        expect(list.getLast()?.value).toBe(3)
        expect(list.size).toBe(1)
    })

    test('should return the first element', () => {
        list.appendFirst(3)
        list.appendFirst(4)
        expect(list.getFirst()?.value).toBe(4)
    })

    test('should return the last element', () => {
        list.appendLast(3)
        list.appendLast(4)
        expect(list.getLast()?.value).toBe(4)
    })

    test('should return null if the list is empty', () => {
        expect(list.getFirst()).toBeUndefined()
        expect(list.getLast()).toBeUndefined()
        expect(list.size).toBe(0)
    })

    test('should be able to iterate all the element forward', () => {
        for (let i = 0; i < 5; i++) {
            list.appendLast(i)
        }
        const getValues = []
        let current = list.getFirst()
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([0, 1, 2, 3, 4])

        for (let i = 0; i < 5; i++) {
            list.appendFirst(i)
        }
        const getValues2 = []
        let current2 = list.getFirst()
        while (current2) {
            getValues2.push(current2.value)
            current2 = current2.next
        }
        expect(getValues2).toEqual([4, 3, 2, 1, 0, 0, 1, 2, 3, 4])
    })

    test('should be able to iterate all the element backward', () => {
        for (let i = 0; i < 5; i++) {
            list.appendLast(i)
        }
        const getValues = []
        let current = list.getLast()
        while (current) {
            getValues.push(current.value)
            current = current.prev
        }
        expect(getValues).toEqual([4, 3, 2, 1, 0])

        for (let i = 0; i < 5; i++) {
            list.appendFirst(i)
        }
        const getValues2 = []
        let current2 = list.getLast()
        while (current2) {
            getValues2.push(current2.value)
            current2 = current2.prev
        }
        expect(getValues2).toEqual([4, 3, 2, 1, 0, 0, 1, 2, 3, 4])
    })

    test('should be able to remove first properly', () => {
        list.appendFirst(3)
        list.appendFirst(4)
        list.removeFirst()
        let current = list.getLast()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.prev
        }
        expect(getValues).toEqual([3])
    })

    test('should be able to remove first properly', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.removeLast()
        let current = list.getFirst()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([3])
    })

    test('should forgive chaging values in node', () => {
        // list.appendLast(3);
        // list.appendLast(4);
        // const first = list.getFirst()
        // if(first){
        //     first.next = null
        // }
        // let current = list.getFirst();
        // const getValues = [];
        // while(current){
        //     getValues.push(current.value);
        //     current = current.next;
        // }
        // expect(getValues).toEqual([3, 4]);
    })
    test('should forbid use a node that has been removed from array', () => {
        list.appendLast(3)
        list.appendLast(4)
        let first = list.getFirst()
        list.removeFirst()
        //expect to throw exception when getting value
        expect(() => {
            first?.value
        }).toThrow('Node has been deleted')
    })

    test('should be able to insert a value given index', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.appendLast(6)
        list.appendLast(7)
        list.insert(1, 5)
        let current = list.getFirst()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([3, 5, 4, 6, 7])
    })

    test('should be able to remove a value given index', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.appendLast(6)
        list.appendLast(7)
        list.remove(1)
        let current = list.getFirst()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([3, 6, 7])
    })

    test('should be able to concat 2 double list', () => {
        let list2 = new DoubleLinkedList<number>()
        list.appendLast(3)
        list.appendLast(4)
        list.appendLast(5)
        list2.appendLast(6)
        list2.appendLast(7)
        list.concat(list2)
        let current = list.getFirst()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([3, 4, 5, 6, 7])
    })

    test('should be able to cut a double list given a index', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.appendLast(5)
        list.appendLast(6)
        list.appendLast(7)
        let list2 = list.split(2)
        let current = list.getFirst()
        const getValues = []
        while (current) {
            getValues.push(current.value)
            current = current.next
        }
        expect(getValues).toEqual([3, 4])
        let current2 = list2.getFirst()
        const getValues2 = []
        while (current2) {
            getValues2.push(current2.value)
            current2 = current2.next
        }
        expect(getValues2).toEqual([5, 6, 7])
    })

    test('should be able to split and concat a double list', () => {
        list.appendLast(3)
        list.appendLast(4)
        list.appendLast(5)
        list.appendLast(6)
        list.appendLast(7)
        const originalList = _.cloneDeep(list)
        let list2 = list.split(2)
        list.concat(list2)
        let current = list.getFirst()
        let originalCurrent = originalList.getFirst()
        const getValues = []
        while (current && originalCurrent) {
            getValues.push(current.value)
            current = current.next
            originalCurrent = originalCurrent.next
            expect(current?.value).toBe(originalCurrent?.value)
        }
        expect(list.size).toBe(5)
    })
})
