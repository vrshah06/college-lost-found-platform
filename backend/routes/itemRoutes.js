const express = require("express");

const router = express.Router();

const {
  createItem,
  getItems,
  getMyItems,
  deleteItem,
  getItemById,
  updateItem,
} = require("../controllers/itemController");

const { protect } = require("../middlewares/authMiddleware");


// GET ALL ITEMS
router.get("/", getItems);

router.get("/my-items", protect, getMyItems);

router.post("/", protect, createItem);
router.delete("/:id", protect, deleteItem);
router.get("/:id", protect, getItemById);

router.put("/:id", protect, updateItem);

module.exports = router;