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
