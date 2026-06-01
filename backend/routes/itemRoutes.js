const express = require("express");

const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

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

router.post("/", protect, upload.single("image"), createItem);
router.delete("/:id", protect, deleteItem);
router.get("/:id", protect, getItemById);

router.put("/:id", protect, updateItem);

module.exports = router;
