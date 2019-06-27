import * as express from 'express';
import { TodoApp } from './src/todo';

const todo = new TodoApp();

const serv = express();
serv.use(express.json());

const port = 3000;
/**
 * Helper function to check if ids are numbers
 * @param input - The string to be checked
 */
const validateId = (input: string): number => {
    const id = parseInt(input);
    if (isNaN(id)) {
        const err: any = new Error('Invalid item id');
        err.statusCode = 400;
        throw err;
    }
    return id;
};

serv.get('/', (req, res) => {
    const list = todo.listAllToDos();
    res.json(list);
});

serv.post('/', (req, res) => {
    const data = req.body;
    res.json(todo.addItem(data.description, data.dueAt));
});

serv.put('/:id/done', (req, res, next) => {
    const id: number = validateId(req.params.id);
    todo.checkItem(id);
    res.status(200).end();
});

serv.delete('/:id', (req, res) => {
    const id: number = validateId(req.params.id);
    res.send(todo.removeItem(id));
});

serv.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.statusCode || 500).json(err.message);
});

serv.listen(port, () => console.log(`Todo app listening on port ${port}`));
