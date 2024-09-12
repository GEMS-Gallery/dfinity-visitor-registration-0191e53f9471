import Int "mo:base/Int";
import Text "mo:base/Text";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor VisitorManagement {
  type Visitor = {
    name: Text;
    reason: Text;
    host: Text;
    timestamp: Int;
  };

  stable var visitors : [Visitor] = [];

  public func addVisitor(name: Text, reason: Text, host: Text) : async () {
    let visitor : Visitor = {
      name = name;
      reason = reason;
      host = host;
      timestamp = Time.now();
    };
    visitors := Array.append(visitors, [visitor]);
  };

  public query func getVisitors() : async [Visitor] {
    visitors
  };

  public query func getHosts() : async [Text] {
    [
      "John Doe",
      "Jane Smith",
      "Mike Johnson",
      "Emily Brown"
    ]
  };

  system func preupgrade() {
    // No need to do anything as we're using a stable variable
  };

  system func postupgrade() {
    // No need to do anything as we're using a stable variable
  };
}
