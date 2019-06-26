import { Item } from './item';
    /**
     * Allows the creation and maintenance of a simple todo list
     */
class TodoApp {
    private toDoList: Map<number, Item>;
    private curId: number;

    constructor() {
        this.curId = 1;
        this.toDoList = new Map<number, Item>();
    }

    public addItem(description: string, dueAt: string): Item {
        const date = new Date(dueAt);
        if (date.toString() === 'Invalid Date') {
            throw new Error('The date you entered is invalid');
        }
        const item = new Item(description, date, this.curId++);
        this.toDoList.set(item.id, item);
        return item;
    }
    public checkItem(id: number) {
        this.validateItem(id);
        this.toDoList.get(id).done = new Date();
    }

    public uncheckItem(id: number) {
        this.validateItem(id);
        this.toDoList.get(id).done = undefined;
    }

    public removeItem(id: number): Item {
        this.validateItem(id);

        const deleted = this.toDoList.get(id);
        this.toDoList.delete(id);
        return deleted;
    }

    public listAllToDos(): Item[] {
        const ids = Array.from(this.toDoList.values());
        return ids;
    }

    public listCompletedToDos(): Item[] {
        const it = this.toDoList.values();
        const completed = [];
        for (const i of Array.from(it)) {
            if (i.done) {
                completed.push(i);
            }
        }
        return completed;
    }

    public listUncompletedToDos(): Item[] {
        const it = this.toDoList.values();
        const uncompleted = [];
        for (const i of Array.from(it)) {
            if (!i.done) {
                uncompleted.push(i);
            }
        }
        return uncompleted;
    }

    public clearAllToDos() {
        this.toDoList.clear();
    }

    /**
     * A debugging function
     * 
     * @param id - An id
     * @returns the item with id `id` 
     */
    public returnItem(id: number): Item {
        this.validateItem(id);
        return this.toDoList.get(id);
    }

    private validateItem(id: number){
        if (!this.toDoList.has(id)) {
            let err: any = new Error('No such item exists');
            err.statusCode = 404;
            throw err;
        }
    }
}
export { TodoApp };
