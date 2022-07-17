const express = require("express");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getGenderProductHasSale,
  checkProductHasSell,
  checkQuantityProductHasSell,
} = require("../controllers/orders.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getOrders).post(createOrder);

router.route("/check").post(checkProductHasSell);
router.route("/checkQuantity").post(checkQuantityProductHasSell);
router.route("/gender").post(getGenderProductHasSale);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
