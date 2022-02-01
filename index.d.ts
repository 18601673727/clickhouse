/// <reference types="node" />

declare module "clickhouse-fork" {
  import { Stream } from "stream";

  type callbackExec = (error: Error, rows?: Object[]) => void;

  export class ClickHouse {
    constructor(opts: Object);
    query<T>(query: String, reqParams?: object): QueryCursor<T>;
    insert<T>(query: String, data?: object): QueryCursor<T>;
    sessionId: string;
  }

  export class WriteStream extends Stream.Transform {
    writeRow(data: Array<any> | string): Promise<void>;
    exec(): Promise<{}>;
  }

  class QueryCursor<T> {
    toPromise(): Promise<T>;
    exec(callback: callbackExec): void;
    stream(): Stream & WriteStream;
    withTotals(): QueryCursor<T>;
  }
}
