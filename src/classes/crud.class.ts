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

Crud.prototype.delete = function(whereObj?: WhereConditions): Promise<any> {
  let delPart = `DELETE FROM ${this.name}`;
  const preparedArray: Array<string> = [];
  const wherePart = extractWhereStmt(whereObj, val => {
    preparedArray.push(val);
  });
  return prmisifyTheQuery(`${delPart} ${wherePart}`, preparedArray);
};

Crud.prototype.select = function(
  columns?: Array<string>,
  whereObj?: WhereConditions
): Promise<any> {
  const cols = columns ? columns.join(', ') : '*';
  const preparedArray: Array<string> = [];
  const wherePart = extractWhereStmt(whereObj, val => {
    preparedArray.push(val);
  });
  console.log(`SELECT ${cols} FROM ${this.name} ${wherePart}`);
  return prmisifyTheQuery(`SELECT ${cols} FROM ${this.name} ${wherePart}`);
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
