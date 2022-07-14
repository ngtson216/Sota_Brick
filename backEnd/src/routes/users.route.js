const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setActive,
  deleteUser,
} = require("../controllers/users.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// router.use(requireAuth);

router.route("/").get(requireAuth, getUsers).post(createUser);

router.route("/:id").get(requireAuth, getUser).put(requireAuth, updateUser).delete(requireAuth, deleteUser);

router.route("/:id/active").patch(requireAuth, setActive(1));

router.route("/:id/inactive").patch(requireAuth, setActive(0));

module.exports = router;
