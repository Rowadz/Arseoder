import { prmisifyTheQuery } from '../helpers/util.helper';

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

const loopThroughObj = (obj: any, cb: (key: string, values: any) => any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(key, obj[key]);
    }
  }
};
