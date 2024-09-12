export const idlFactory = ({ IDL }) => {
  const Visitor = IDL.Record({
    'host' : IDL.Text,
    'name' : IDL.Text,
    'timestamp' : IDL.Int,
    'reason' : IDL.Text,
  });
  return IDL.Service({
    'addVisitor' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'getHosts' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getVisitors' : IDL.Func([], [IDL.Vec(Visitor)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
