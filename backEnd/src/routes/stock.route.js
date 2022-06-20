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

router.use(requireAuth);

router.route("/").get(getStocks).post(createStock);
router.route("/check-in/").post(checkStockIn);
router.route("/check-out/").post(checkStockOut);
router.route("/check-available/").post(checkStockAvailable);

router.route("/:id").get(getStock).put(updateStock).delete(deleteStock);

module.exports = router;
