const express = require("express");
const {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  checkStockIn,
  checkStockOut,
  checkStockAvailable,
} = require("../controllers/stocks.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// router.use(requireAuth);

router.route("/").get(getStocks).post(requireAuth, createStock);
router.route("/check-in/").post(requireAuth, checkStockIn);
router.route("/check-out/").post(requireAuth, checkStockOut);
router.route("/check-available/").post(checkStockAvailable);

router.route("/:id").get(getStock).put(updateStock).delete(deleteStock);

module.exports = router;
