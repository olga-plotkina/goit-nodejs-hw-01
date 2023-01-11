const { addContact, removeContact } = require("./contacts");

async function invokeAction({ action, name, email, phone, contactId }) {
  switch (action) {
    case "add":
      await addContact(name, email, phone);
      break;
    case "remove":
      await removeContact(contactId);
      break;
    case "list":
      const contacts = await removeContact(contactId);
      console.table(contacts);
      break;

    default:
      break;
  }
}

// invokeAction({ action: "add", name: "Olia", email: "email1", phone: 11111 });
invokeAction({ action: "remove", contactId: "1" });
