const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contacts = await getAllContacts();
  console.table(contacts);
}

async function getAllContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if(index === -1) return null;
  
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if(index === -1) return null;
  
  contacts[index] = {...contacts[index], ...data};
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
