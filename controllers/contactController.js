const asynHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contact
//@route Get /api/contacts
//@ access public

const getContact = asynHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc get contact by id name
//@route GET /api/contacts/:id
//@ access public

const getContacts = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
  }
  res.status(200).json({ contact });
});

//@desc Create New  contact
//@route POST /api/contacts
//@ access public

const createContact = asynHandler(async (req, res) => {
  console.log("This is my responce", req.body);
  //Error Handling
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All values are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Update   contact
//@route PUT /api/contacts/:id
//@ access public

const updateContact = asynHandler(async (req, res) => {
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

//@desc Delete contact
//@route Delete /api/contacts/:id
//@ access public

const deleteContact = asynHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200).json({ message: "Contact delete", contact });
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};
