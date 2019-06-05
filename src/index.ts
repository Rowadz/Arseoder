import { BaseModel } from './classes/base-model.class';
import { Model } from './interfaces/interfaces';

const Model = (() => {
  function model(name: string) {
    BaseModel.call(this);
    this.name = name;
  }
  model.prototype = Object.create(BaseModel.prototype);
  return model;
})();

const users: Model = new (Model as any)('users');

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
  .then(async () => {
    try {
      await users.create<Partial<Users>>({
        name: 'rowad 2',
        role: 'admin',
        date: new Date()
      });
      await users.create<Partial<Users>>({
        name: 'rowad 3',
        role: 'user',
        date: new Date()
      });
      await users.update<Partial<Users>>(
        { name: 'updated name' },
        { id: { value: 1 }, name: { value: 'rowad', opertation: 'AND' } }
      );

      await users.delete({
        name: { value: 'rowad 3' },
        id: { value: 3, opertation: 'OR' }
      });

      const res: Array<Partial<Users>> = await users.select(['name']);
      const res2: Array<Partial<Users>> = await users.select(undefined, {
        id: { value: 1 },
        name: { value: 'rowad 2', opertation: 'OR' },
        role: { value: 'admin', opertation: 'AND' }
      });
      console.log(res2);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);

interface Users {
  id: number;
  name: string;
  date: Date;
  role: 'user' | 'admin';
}
