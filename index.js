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
let data;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      data = await addContact(name, email, phone);
      break;
    case "remove":
      data = await removeContact(id);
      break;
    case "list":
      data = await listContacts();
      break;
    case "get":
      data = await getContactById(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
  console.table(data);
}

invokeAction(argv);
