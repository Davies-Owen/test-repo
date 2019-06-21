import { Item } from './item';
class TodoApp {
    /**
     * Allows the creation and maintenance of a simple todo list
     */

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
    public removeItem(id: number): Item {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        const deleted = this.toDoList.get(id);
        this.toDoList.delete(id);
        return deleted;
    }

    public listAllToDos(): Item[] {
        // if (!this.toDoList.size) {
        //     throw new Error('The todo list is empty');
        // }
        const ids = Array.from(this.toDoList.values());
        return ids;
    }

    public listCompletedToDos(): Array<string | number | Date | boolean>[] {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        const it = this.toDoList.values();
        const completed = [];
        for (const i of Array.from(it)) {
            if (i.done) {
                completed.push([i.id, i.description, i.dueAt]);
            }
        }
        if (!completed.length) {
            throw new Error('There are no completed items');
        }
        return completed;
    }

    public listUncompletedToDos(): Array<string | number | Date | boolean>[] {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        const it = this.toDoList.values();
        const uncompleted = [];
        for (const i of Array.from(it)) {
            if (!i.done) {
                uncompleted.push([i.id, i.description, i.dueAt]);
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
export { TodoApp };
