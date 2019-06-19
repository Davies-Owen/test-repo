"use strict";
exports.__esModule = true;
var Item = /** @class */ (function () {
    function Item(description, dueAt, id) {
        this.id = id;
        this.description = description;
        this.dueAt = dueAt;
        this.createdAt = new Date();
        this.done = false;
    }
    return Item;
}());
exports.Item = Item;
