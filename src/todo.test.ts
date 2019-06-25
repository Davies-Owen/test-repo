import { TodoApp } from './todo';
const todo = new TodoApp();

describe('todo App', () => {
    describe('#addItem', () => {
        test('Adds an item to the todo list, returning its id = 1', () => {
            expect(todo.addItem('Pick up milk', '6/14/19')).toBe(1);
        });

        test('Adds a second item to the todo list, returning its id = 2', () => {
            expect(todo.addItem('Get gas', '6/14/19')).toBe(2);
        });

        test('Adds a third item to the todo list with an invalid date. should throw error', () => {
            expect(() => { todo.addItem('Cook dinner', 'Tuesday'); }).toThrow(/invalid/);
        });

    });
    test('Testing our debugging function for completeness\' sake', () => {
        expect(() => { todo.returnItem(5); }).toThrow('No such item exists');
        expect(todo.returnItem(2)).toMatchObject({ description: 'Get gas', id: 2, done: false });
    });

    test('Lists all items on the todo list. There should be 2', () => {
        const a = new Set([1, 2]);
        expect(new Set(todo.listAllToDos())).toEqual(a);
    });

    test('Checks an item on the todo list. returns true if successful', () => {
        expect(todo.checkItem(1)).toBe(true);
    });
    describe('#checkItem and uncheckItem', () => {
        test('Checking a nonexistent item. Should throw error', () => {
            expect(() => { todo.checkItem(5); }).toThrow('No such item exists');
        });

        test('Unchecking a nonexistent item. Should throw error', () => {
            expect(() => { todo.uncheckItem(0); }).toThrow('No such item exists');
        });
    });

    describe('#listCompletedToDos and listUncompletedToDos', () => {
        test('Listing all checked items. should return id 1', () => {
            expect(todo.listCompletedToDos()).toEqual([1]);
        });

        test('Listing all unchecked items. should return id 2', () => {
            expect(todo.listUncompletedToDos()).toEqual([2]);
        });
    });

    test('Adding a third item to the todo list, returning its id = 3', () => {
        expect(todo.addItem('Clean', '6/24/19')).toBe(3);
    });

    test('Removing item 1 from the todo list. should return true', () => {
        expect(todo.removeItem(1)).toEqual(true);
    });

    test('Removing a nonexistent item from the todo list. should return false', () => {
        expect(() => { todo.removeItem(9); }).toThrow('No such item exists');
    });

    test('Listing all checked items. should throw an error, as there are none', () => {
        expect(() => { todo.listCompletedToDos(); }).toThrow('There are no completed items');
    });

    test('Checking items 2 and 3, then listing all unchecked items. should throw an error, as there are none', () => {
        todo.checkItem(2);
        todo.checkItem(3);
        expect(() => { todo.listUncompletedToDos(); }).toThrow('There are no uncompleted items');
    });

    test('Unchecking item 3. should return true', () => {
        expect(todo.uncheckItem(3)).toBe(true);
    });

    describe('#clearAllToDos and listing when list is empty', () => {
        test('Clearing all items from the list. should return true', () => {
            expect(todo.clearAllToDos()).toBe(true);
        });

        test('Listing all items. should throw an error, since the list has been cleared', () => {
            expect(() => { todo.listAllToDos(); }).toThrow('The todo list is empty');
        });

        test('Listing all checked items . should throw an error, since the list has been cleared', () => {
            expect(() => { todo.listCompletedToDos(); }).toThrow('The todo list is empty');
        });

        test('Listing all unchecked items. should throw an error, since the list has been cleared', () => {
            expect(() => { todo.listUncompletedToDos(); }).toThrow('The todo list is empty');
        });
    });
});
