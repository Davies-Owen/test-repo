"use strict";
exports.__esModule = true;
var item_1 = require("./item");
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        this.curId = 1;
        this.toDoList = new Map();
    }
    // Had to generate the item ID here so two todoApps could have separate id lists
    TodoApp.prototype.addItem = function (description, dueAt) {
        var date = new Date(dueAt);
        if (date.toString() === 'Invalid Date') {
            throw new Error('The date you entered is invalid');
        }
        var item = new item_1.Item(description, date, this.curId++);
        this.toDoList.set(item.id, item);
        return item.id;
    };
    TodoApp.prototype.checkItem = function (id) {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList.get(id).done = true;
        return true;
    };
    TodoApp.prototype.uncheckItem = function (id) {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList.get(id).done = false;
        return true;
    };
    TodoApp.prototype.removeItem = function (id) {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        this.toDoList["delete"](id);
        return true;
    };
    TodoApp.prototype.listAllToDos = function () {
        // if (!this.toDoList.size) {
        //     throw new Error('The todo list is empty');
        // }
        var ids = Array.from(this.toDoList.values());
        return ids;
    };
    TodoApp.prototype.listCompletedToDos = function () {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        var it = this.toDoList.values();
        var completed = [];
        for (var _i = 0, _a = Array.from(it); _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.done) {
                completed.push([i.id, i.description, i.dueAt]);
            }
        }
        if (!completed.length) {
            throw new Error('There are no completed items');
        }
        return completed;
    };
    TodoApp.prototype.listUncompletedToDos = function () {
        if (!this.toDoList.size) {
            throw new Error('The todo list is empty');
        }
        var it = this.toDoList.values();
        var uncompleted = [];
        for (var _i = 0, _a = Array.from(it); _i < _a.length; _i++) {
            var i = _a[_i];
            if (!i.done) {
                uncompleted.push([i.id, i.description, i.dueAt]);
            }
        }
        if (!uncompleted.length) {
            throw new Error('There are no uncompleted items');
        }
        return uncompleted;
    };
    TodoApp.prototype.clearAllToDos = function () {
        this.toDoList.clear();
        return true;
    };
    TodoApp.prototype.returnItem = function (id) {
        if (!this.toDoList.has(id)) {
            throw new Error('No such item exists');
        }
        return this.toDoList.get(id);
    };
    return TodoApp;
}());
exports.TodoApp = TodoApp;
