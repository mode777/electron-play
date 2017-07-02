export interface DbConnection {
    getAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult> 
    getByKeysAsync<TResult extends any>(table: string, keysObject: any): Promise<TResult>
    getByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs: any[]): Promise<TResult>
    queryByWhereAsync<TResult extends any>(table: string, whereClause: string, whereClauseArgs: any[]): Promise<TResult[]>
    insertAsync(table: string, valuesObject: any): Promise<void>
    updateByKeysAsync(table: string, valuesObject: any, keysObject: any): Promise<void>
    updateByWhereAsync(table: string, valuesObject: any, whereClause: string, whereClauseArgs: any[]): Promise<void>
    deleteByKeysAsync(table: string, keysObject: any): Promise<void>
    deleteByWhereAsync(table: string, whereClause: string, whereClauseArgs: any[]): Promise<void>
    getScalarAsync(query: string, ...params: any[]): Promise<number> 
    getLastIdAsync() : Promise<number>
    runTransactionAsync(executor: () => Promise<void>): Promise<void>
    executeAsync(query: string, ...params: any[]): Promise<void> 
    queryAsync<TResult extends any>(query: string, ...params: any[]): Promise<TResult[]>
    closeAsync(): Promise<void>
}