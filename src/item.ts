class Item {
    public id: number;
    public description: string;
    public dueAt: Date;
    public createdAt: Date;
    public done: boolean;
    constructor(description: string, dueAt: Date, id: number) {
        this.id = id;
        this.description = description;
        this.dueAt = dueAt;
        this.createdAt = new Date();
        this.done = false;
    }

}

export { Item };
