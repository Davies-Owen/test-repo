import * as express from 'express';
import { TodoApp } from './src/todo';

const todo = new TodoApp();

const serv = express();
serv.use(express.json());

const port = 3000;

serv.get('/', function (req, res) {
    res.json(todo.listAllToDos());
});

serv.put('/', function (req, res) {
    const data = req.body;
    try {
        todo.addItem(data.description, data.dueAt);
        res.status(200).end();
    } catch (e) {
        if (e.message === 'The date you entered is invalid') {
            res.status(400).json({ "error" : "The date you entered is invalid" });
        } else {
            throw e;
        }
    }
});

serv.post('/:id/done', function (req, res) {
    const id: string = req.params.id;
    try {
        todo.checkItem(parseInt(id));
        res.status(200).end();
    } catch (e) {
        if (e.message === 'No such item exists') {
            res.status(404).json({ 'error': 'Item could not be found' });
        } else {
            throw e;
        }
    }
});

serv.delete('/:id', function (req, res) {
    const id: string = req.params.id;
    try {
        res.send(todo.removeItem(parseInt(id)));
    } catch (e) {
        if (e.message === 'No such item exists') {
            res.status(404).json({ 'error': 'Item could not be found' });
        } else {
            throw e;
        }
    }
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
