const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  return JSON.parse(dbRaw);
}

async function writeContacts(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  return await readContacts();
}

function getContactById(contactId) {
  // ...твой код
}

async function removeContact(contactId) {
  const db = await readContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeContacts(updatedDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readContacts();
  db.push(contact);
  await writeContacts(db);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
