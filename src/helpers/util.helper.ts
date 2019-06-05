import { createConnection, MysqlError } from 'mysql';
import { ColumnOptions } from '../interfaces/interfaces';

const con = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'orm_3'
});

export const prmisifyTheQuery = (
  query: string,
  preparedArray: Array<any> = []
): Promise<any> => {
  return new Promise((resolve, reject) => {
    con.query(query, preparedArray, (error: MysqlError, result: any) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};

export const getCorrectFormat = ({
  type,
  len,
  enumValues
}: ColumnOptions): string => {
  switch (type) {
    case 'VARCHAR':
      return `${type}(${len})`;
    case 'ENUM':
      return `${type}(${enumValues.map((s: string) => `'${s}'`).join(', ')})`;
    default:
      return type;
  }
};
