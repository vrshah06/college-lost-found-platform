const express = require("express");

const router = express.Router();

const {
  createClaim,
    getOwnerClaims,
    updateClaimStatus,
} = require("../controllers/claimController");

const {
  protect,
} = require("../middlewares/authMiddleware");

router.post("/", protect, createClaim);
router.get("/my-claims", protect, getOwnerClaims);
router.put("/:id", protect, updateClaimStatus);

module.exports = router;