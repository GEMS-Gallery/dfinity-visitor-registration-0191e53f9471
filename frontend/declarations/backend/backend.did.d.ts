import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Visitor {
  'host' : string,
  'name' : string,
  'timestamp' : bigint,
  'reason' : string,
}
export interface _SERVICE {
  'addManager' : ActorMethod<[string, string], undefined>,
  'addVisitor' : ActorMethod<[string, string, string], undefined>,
  'getHosts' : ActorMethod<[], Array<string>>,
  'getVisitors' : ActorMethod<[], Array<Visitor>>,
  'login' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
