const Item = require("../models/Item");


// CREATE ITEM
const createItem = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      title,
      description,
      category,
      location,
      status,
    } = req.body;

    const item = await Item.create({
      title,
      description,
      category,
      location,
      status,
      image: req.file ? req.file.path : "",
      user: req.user._id,
    });

    res.status(201).json(item);

  } catch (error) {
    console.log("CREATE ITEM ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// GET MY ITEMS
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(items);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL ITEMS
const getItems = async (req, res) => {

  try {

    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (
      item.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedItem =
      await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedItem);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createItem,
  getItems,
  getMyItems,
  deleteItem,
  getItemById,
  updateItem,
};