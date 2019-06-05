"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_class_1 = require("./classes/base-model.class");
const Model = (() => {
    function model(name) {
        base_model_class_1.BaseModel.call(this);
        this.name = name;
    }
    model.prototype = Object.create(base_model_class_1.BaseModel.prototype);
    return model;
})();
const users = new Model('users');
users
    .addPk('id', { autoIncrement: true, type: 'INT' })
    .addCol('name', { type: 'VARCHAR', len: 250, default: 'NO NAME' })
    .addCol('role', {
    type: 'ENUM',
    default: 'user',
    enumValues: ['user', 'admin']
})
    .addCol('date', { type: 'DATETIME' })
    .buildTable()
    .createTable()
    .then(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield users.create({
            name: 'rowad 2',
            role: 'admin',
            date: new Date()
        });
        yield users.create({
            name: 'rowad 3',
            role: 'user',
            date: new Date()
        });
        yield users.update({ name: 'updated name' }, { id: { value: 1 }, name: { value: 'rowad', opertation: 'AND' } });
        yield users.delete({
            name: { value: 'rowad 3' },
            id: { value: 3, opertation: 'OR' }
        });
        const res = yield users.select(['name']);
        const res2 = yield users.select(undefined, {
            id: { value: 1 },
            name: { value: 'rowad 2', opertation: 'OR' },
            role: { value: 'admin', opertation: 'AND' }
        });
        console.log(res2);
    }
    catch (error) {
        console.error(error);
    }
}))
    .catch(console.error);
