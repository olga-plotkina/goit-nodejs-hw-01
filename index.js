const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, name, email, phone, contactId }) {
  console.log(action);
  switch (action) {
    case "add":
      await addContact(name, email, phone);
      break;
    case "remove":
      await removeContact(contactId);
      break;
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
    case "get":
      const contact = await getContactById(contactId);
      console.log(contact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
