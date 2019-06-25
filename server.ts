import * as express from 'express';
import { TodoApp } from './src/todo';

const todo = new TodoApp();

const serv = express();
serv.use(express.json());

const port = 3000;

serv.get('/', function(req, res, next) {
    res.json(todo.listAllToDos());
});

serv.post('/', function(req, res, next) {
    const data = req.body;
    res.json(todo.addItem(data.description, data.dueAt));
});

serv.put('/:id/done', function(req, res, next) {
    const id: string = req.params.id;
    todo.checkItem(parseInt(id));
    res.status(200).end();
});

serv.delete('/:id', function(req, res, next) {
    const id: string = req.params.id;
    res.send(todo.removeItem(parseInt(id)));
});

serv.use(function(err, req, res, next) {
    console.error(err.message);
    res.status(err.statusCode || 500).send(err.message);
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
