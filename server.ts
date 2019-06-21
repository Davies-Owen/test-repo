import * as express from 'express';

import { Item } from './src/item';
import { TodoApp } from './src/todo';

const todo = new TodoApp();

const serv = express();
serv.use(express.json());

const port = 3000;

serv.get('/', function (req, res) {
    res.send(todo.listAllToDos());
});

serv.put('/', function (req, res) {
    const data = req.body;
    try {
        todo.addItem(data.description, data.dueAt);
        res.sendStatus(200);
    } catch (e) {
        if (e.message = 'The date you entered is invalid') {
            res.status(400).send('The date you entered is invalid');
        } else {
            throw e;
        }
    }
});

serv.post(/^\/[0-9]+\/done/, function (req, res) {
    const id: string = req.path.split('/')[1];
    try {
        todo.checkItem(parseInt(id));
        res.sendStatus(200);
    } catch (e) {
        if (e.message = 'No such item exists') {
            res.send(`Item ${id} does not exist`);
            res.status(404).send(`Item ${id} does not exist`);
        } else {
            throw e;
        }
    }
});

serv.delete(/^\/[0-9]+/, function (req, res) {
    const id: string = req.path.split('/')[1];
    try {
        res.send(todo.removeItem(parseInt(id)));
    } catch (e) {
        if (e.message = 'No such item exists') {
            res.status(404).send(`Item ${id} does not exist`);
        } else {
            throw e;
        }
    }
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
