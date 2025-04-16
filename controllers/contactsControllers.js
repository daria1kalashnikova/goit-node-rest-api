import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.listContacts({ owner });
  res.json(data);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.getContact({ id, owner });
  console.log(data);
  if (!data) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.removeContact({ id, owner });
  if (!data) {
    throw HttpError(404);
  }
  res.json(data);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.updateContact({ id, owner }, req.body);

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.updateStatusContact(id, req.body);

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
