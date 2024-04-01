const express = require("express");

const router = express.Router();
const {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").get(getContact).post(createContact);

router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

router.route("/:id").get(getContacts);

module.exports = router;
