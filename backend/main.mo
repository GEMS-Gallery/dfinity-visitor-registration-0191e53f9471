import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

actor VisitorManagement {
  type Visitor = {
    name: Text;
    reason: Text;
    host: Text;
    timestamp: Int;
  };

  stable var visitors : [Visitor] = [];
  let managers = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  public shared(msg) func addVisitor(name: Text, reason: Text, host: Text) : async () {
    let visitor : Visitor = {
      name = name;
      reason = reason;
      host = host;
      timestamp = Time.now();
    };
    visitors := Array.append(visitors, [visitor]);
  };

  public query func getHosts() : async [Text] {
    [
      "Doge",
      "Grumpy Cat",
      "Nyan Cat",
      "Keyboard Cat"
    ]
  };

  public shared(msg) func addManager(username: Text, password: Text) : async () {
    assert(msg.caller == Principal.fromText("aaaaa-aa"));
    managers.put(username, password);
  };

  public query func login(username: Text, password: Text) : async Bool {
    switch (managers.get(username)) {
      case (?storedPassword) { storedPassword == password };
      case null { false };
    }
  };

  public query func getVisitors() : async [Visitor] {
    visitors
  };

  system func preupgrade() {
    // No need to do anything as we're using a stable variable for visitors
  };

  system func postupgrade() {
    // Initialize managers after upgrade
    managers.put("admin", "password123");
    managers.put("Manager", "Manager");
  };
}
