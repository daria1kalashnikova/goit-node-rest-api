import User from "../db/models/Contact.js";

export const listContacts = async () => {
  const contacts = await User.findAll();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await User.findByPk(contactId);
  return contact;
};

export const removeContact = async (contactId) => {
  const contact = await User.findByPk(contactId);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
};

export const addContact = async (data) => {
  const contact = await User.create(data);
  return contact;
};

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  const updatedContact = await contact.update(data, { returning: true });
  return updatedContact;
};

export const updateStatusContact = async (contactId, body) => {
  if (!body || typeof body.favorite !== "boolean") {
    return null;
  }
  const updatedContact = await updateContact(contactId, {
    favorite: body.favorite,
  });
  return updatedContact;
};
