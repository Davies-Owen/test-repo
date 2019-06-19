import { Item } from './item';

class TodoApp {

    public toDoList: Map<number, Item>;
    public curId: number;

    constructor() {
        this.curId = 1;
        this.toDoList = new Map<number, Item>();
    }

    // Had to generate the item ID here so two todoApps could have separate id lists
    public addItem(description: string, dueAt: string): number {
        const date = new Date(dueAt);
        if (date.toString() === 'Invalid Date') {
            throw new Error('The date you entered is invalid');
        }
        const item = new Item(description, date, this.curId++);
        this.toDoList.set(item.id, item);
        return item.id;
    }
    public checkItem(id: number): boolean {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList.get(id).done = true;
        return true;
    }
    public uncheckItem(id: number): boolean {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList.get(id).done = false;
        return true;
    }
    public removeItem(id: number): boolean {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList.delete(id);
        return true;
    }

    public listAllToDos(): number[] {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        const ids = Array.from(this.toDoList.values()).map((i) => i.id);
        return ids;
    }

    public listCompletedToDos(): number[] {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        const it = this.toDoList.values();
        const completed = [];
        for (const v of Array.from(it)) {
            if (v.done) {
                completed.push(v.id);
            }
        }
        if (!completed.length) {
            throw new Error('There are no completed items');
        }
        return completed;
    }

    public listUncompletedToDos(): number[] {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        const it = this.toDoList.values();
        const uncompleted = [];
        for (const v of Array.from(it)) {
            if (!v.done) {
                uncompleted.push(v.id);
            }
        }
        if (!uncompleted.length) {
            throw new Error('There are no uncompleted items');
        }
        return uncompleted;
    }

    public clearAllToDos(): boolean {
        this.toDoList.clear();
        return true;
    }

    public returnItem(id: number): Item {   // debugging function
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        return this.toDoList.get(id);
    }
}
// Test comment for github purposes
export { TodoApp };
