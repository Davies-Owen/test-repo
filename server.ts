import * as express from 'express';

import { Item } from './src/item';
import { TodoApp } from './src/todo';

const todo = new TodoApp();

const serv = express();
serv.use(express.json());

const port = 3000;

const checkGen = (done: boolean) => {
    if (done) {return `[x]`; } else {return `[ ]`; }
};
serv.get('/', function(req, res) {
    const list: Item[] = todo.listAllToDos();
    let body: string = 'Done?\tID\tDescription\tDue Date\n';
    for (const i of list) {
        const line = checkGen(i.done) + '\t' + i.id + '\t' + i.description + '\t' + i.dueAt + '\n';
        body += line;
    }
    res.send(body);

});

serv.put('/', function(req, res) {
    const data = req.body;
    try {
        res.send('New Item ID: ' + todo.addItem(data.description, data.dueAt));
    } catch (e) {
        if (e.message = 'The date you entered is invalid') {
            res.send('The date you entered is invalid');
        } else {
            throw e;
        }
    }
});

serv.post(/^\/[0-9]+\/done/, function(req, res) {
    const id: string = req.path.split('/')[1];
    try {
        todo.checkItem(parseInt(id));
        res.send(`Item ${id} checked!`);
    } catch (e) {
        if (e.message = 'No such item exists') {
            res.send(`Item ${id} does not exist`);
        } else {
            throw e;
        }
    }
});

serv.delete(/^\/[0-9]+/, function(req, res) {
    const id: string = req.path.split('/')[1];
    try {
        todo.removeItem(parseInt(id));
        res.send(`Item ${id} deleted!`);
    } catch (e) {
        if (e.message = 'No such item exists') {
            res.send(`Item ${id} does not exist`);
        } else {
            throw e;
        }
    }
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
