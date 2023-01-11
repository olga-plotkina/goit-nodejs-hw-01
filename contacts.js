const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readContacts() {
  try {
    const dbRaw = await fs.readFile(contactsPath);
    return JSON.parse(dbRaw);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function writeContacts(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const db = await readContacts();
  const contact = db.filter((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const db = await readContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeContacts(updatedDb);
  return await readContacts();
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readContacts();
  db.push(contact);
  await writeContacts(db);
  return await readContacts();
}

module.exports = { listContacts, getContactById, removeContact, addContact };
