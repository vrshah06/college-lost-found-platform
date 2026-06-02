const Claim = require("../models/Claim");
const Item = require("../models/Item");

const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const claim = await Claim.create({
      item: item._id,
      claimant: req.user._id,
      owner: item.user,
      message,
    });

    res.status(201).json(claim);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOwnerClaims = async (req, res) => {
  try {
    const claims = await Claim.find({
      owner: req.user._id,
    })
      .populate("claimant", "name email")
      .populate("item", "title image status");

    res.status(200).json(claims);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateClaimStatus = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        message: "Claim not found",
      });
    }

    if (
      claim.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    claim.status = req.body.status;

    await claim.save();

    res.status(200).json(claim);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createClaim,
    getOwnerClaims,
    updateClaimStatus,
};