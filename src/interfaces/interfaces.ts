export interface Model extends BaseModel {
  name: string;
}

export interface BaseModel extends Crud {
  table: string;
  cols: Array<string>;
  addPk: (name: string, col: any) => Model;
  addCol: (name: string, col: any) => Model;
  buildTable: () => Model;
  createTable: () => Promise<any>;
}

export interface Definintions {
  [key: string]: ColumnOptions;
}

export interface ColumnOptions {
  autoIncrement?: boolean;
  type?: DataType;
  len?: number;
  allowNull?: boolean;
  unique?: true;
  default?: string;
  enumValues?: Array<string>;
}

export interface Crud {
  create: <T>(data: T) => Promise<any>;
  update: <T>(data: T, whereObj?: WhereConditions) => Promise<any>;
  delete: (whereObj?: WhereConditions) => Promise<any>;
  select: (columns?: Array<string>, whereObj?: WhereConditions) => Promise<any>;
}

export interface WhereConditions {
  [key: string]: Conditions;
}

export interface Conditions {
  opertation?: 'AND' | 'OR';
  value: any;
}

export type DataType =
  // MySQL numeric data types

  | 'TINYINT'
  | 'SMALLINT'
  | 'MEDIUMINT'
  | 'INT'
  | 'BIGINT'
  | 'DECIMAL'
  | 'FLOAT'
  | 'DOUBLE'
  | 'BIT'
  //   MySQL String data types
  | 'CHAR'
  | 'VARCHAR'
  | 'BINARY'
  | 'VARBINARY'
  | 'TINYBLOB'
  | 'BLOB'
  | 'MEDIUMBLOB'
  | 'LONGBLOB'
  | 'TINYTEXT'
  | 'TEXT'
  | 'MEDIUMTEXT'
  | 'LONGTEXT'
  | 'ENUM'
  | 'SET'
  //   MySQL date and time data types
  | 'DATE'
  | 'TIME'
  | 'DATETIME'
  | 'TIMESTAMP'
  | 'YEAR';
