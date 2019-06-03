import { createConnection, MysqlError } from 'mysql';

const con = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'orm'
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
