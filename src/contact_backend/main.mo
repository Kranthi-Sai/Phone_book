import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

    public type Contact = {
        name: Text;
        phone: Text;
    };

    stable var contacts: List.List<Contact> = List.nil<Contact>();

    public func createContact(name: Text, phone: Text) {
        let newContact:Contact = { 
          name = name; 
          phone = phone;
           };
        contacts := List.push(newContact, contacts);
        Debug.print(debug_show(contacts));
    };

    public query func readContacts(): async [Contact] {
        return List.toArray(contacts);
    };

    public func removeContact(id: Nat)  {
      let listFront = List.take(contacts,id);
      let listBack = List.drop(contacts, id + 1);
      contacts := List.append(listFront, listBack);
    };
}
