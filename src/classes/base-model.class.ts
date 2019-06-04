import { Crud } from './crud.class';
import { Model, ColumnOptions } from '../interfaces/interfaces';
import { getCorrectFormat, prmisifyTheQuery } from '../helpers/util.helper';

export function BaseModel() {
  Crud.call(this);
  this.cols = [];
}

BaseModel.prototype = Object.create(Crud.prototype);

BaseModel.prototype.addPk = function(
  name: string,
  { autoIncrement, type }: ColumnOptions
): Model {
  const autoInc = autoIncrement ? 'AUTO_INCREMET' : '';
  this.cols.push(`${name} ${type} ${autoInc} PRIMARY KEY`);
  return this;
};

BaseModel.prototype.addCol = function(name: string, col: ColumnOptions): Model {
  const defaultVal = col.default ? `DEFAULT ${col.default}` : '';
  const isNull = col.allowNull ? 'NULL' : 'NOT NULL';
  this.cols.push(`${name} ${getCorrectFormat(col)} ${isNull} ${defaultVal}`);
  return this;
};

BaseModel.prototype.buildTable = function(): Model {
  this.table = `
            CREATE TABLE IF NOT EXISTS ${this.name}(
                ${this.cols.join(',')}
            )
            `;
  return this;
};

BaseModel.prototype.createTable = function(): Promise<any> {
  return prmisifyTheQuery(this.table);
};
