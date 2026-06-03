const express = require("express");

const router = express.Router();

const {
  createClaim,
  getOwnerClaims,
  updateClaimStatus,
  getMyClaims,
  getPendingCount,
} = require("../controllers/claimController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createClaim);
router.get("/my-claims", protect, getOwnerClaims);
router.put("/:id", protect, updateClaimStatus);
router.get("/my-submissions", protect, getMyClaims);
router.get("/pending-count", protect, getPendingCount);

module.exports = router;
