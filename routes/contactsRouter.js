import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

import validatebody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateContactSatusSchema,
} from "../schemas/contactsSchemas.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validatebody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validatebody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  validatebody(updateContactSatusSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
