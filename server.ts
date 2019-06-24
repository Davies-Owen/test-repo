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
    try {
        res.json(todo.addItem(data.description, data.dueAt));
    } catch (e) {
        return next(e);
    }
});

serv.put('/:id/done', function(req, res, next) {
    const id: string = req.params.id;
    try {
        todo.checkItem(parseInt(id));
        res.status(200).end();
    } catch (e) {
        return next(e);
    }
});

serv.delete('/:id', function(req, res, next) {
    const id: string = req.params.id;
    try {
        res.send(todo.removeItem(parseInt(id)));
    } catch (e) {
        return next(e);
    }
});

serv.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) { err.statusCode = 500; }
    res.status(err.statusCode).send(err.message);
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
