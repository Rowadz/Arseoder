import { prmisifyTheQuery } from '../helpers/util.helper';
import { WhereConditions } from '../interfaces/interfaces';

export function Crud() {}

// 'INSERT INTO {TABLE_NAME} (columns...) VALUES (?, ?, ?, ?)'
Crud.prototype.create = function(data: any): Promise<any> {
  const values: Array<string> = [];
  const columns: Array<string> = [];

  loopThroughObj(data, (key, val) => {
    values.push(val);
    columns.push(key);
  });

  const qMarks: string = Array(columns.length)
    .fill('?')
    .join(', ');
  return prmisifyTheQuery(
    `INSERT INTO ${this.name} (${columns.join(', ')}) VALUES (${qMarks})`
  );
};

// UPDATE {TABLE_NAME} SET values... WHERE conditions..
Crud.prototype.update = function(
  newDate: any,
  whereObj: WhereConditions
): Promise<any> {
  let setPart = 'SET ';
  const preparedArray: Array<string> = [];
  loopThroughObj(newDate, (key, value) => {
    setPart = setPart.concat(`${key} = ?`);
    preparedArray.push(value);
  });
  const wherePart = extractWhereStmt(whereObj, val => {
    preparedArray.push(val);
  });
  const q = `UPDATE ${this.name} ${setPart} ${wherePart}`;
  console.log(q, preparedArray);
  return prmisifyTheQuery(q, preparedArray);
};

const extractWhereStmt = (
  whereObj: WhereConditions,
  cb: (val: any) => void
): string => {
  let wherePart = '';
  loopThroughObj(whereObj, colName => {
    const { opertation, value } = whereObj[colName];
    wherePart = wherePart.concat(
      `${opertation ? opertation : ''} ${colName} = ? `
    );
    cb(value);
  });
  return wherePart ? `WHERE ${wherePart}` : '';
};

const loopThroughObj = (obj: any, cb: (key: string, values: any) => any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(key, obj[key]);
    }
  }
};

const test = new (Crud as any)();

test.update(
  { name: 'rowad' },
  {
    id: { value: 1 },
    name: { value: 'polo', opertation: 'AND' }
  }
);
