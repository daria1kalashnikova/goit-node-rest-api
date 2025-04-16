import User from "../db/models/Contact.js";

export const listContacts = async (query) => {
  const contacts = await User.findAll({
    where: query,
  });
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await User.findByPk(contactId);
  return contact;
};

export const getContact = async (query) => {
  const contact = await User.findOne({
    where: query,
  });
  return contact;
};

export const removeContact = async (query) => {
  const contact = await getContact(query);
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

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
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
