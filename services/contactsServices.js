import User from "../db/models/Contact.js";

export async function listContacts() {
  // const contacts = await fs.readFile(contactsPath, "utf-8");
  // return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  // const contacts = await listContacts();
  // const contact = contacts.find((item) => item.id === contactId);
  // return contact || null;
}

export async function removeContact(contactId) {
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === contactId);
  // if (index === -1) return null;
  // const [removedContact] = contacts.splice(index, 1);
  // await updateContacts(contacts);
  // return removedContact || null;
}

export async function addContact(data) {
  // const contacts = await listContacts();
  // const newContact = {
  //   id: nanoid(),
  //   ...data,
  // };
  // contacts.push(newContact);
  // await updateContacts(contacts);
  // return newContact;
}

export async function updateContact(id, data) {
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) return null;
  // contacts[index] = { ...contacts[index], ...data };
  // await updateContacts(contacts);
  // return contacts[index];
}
