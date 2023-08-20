const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getUserDetailsById,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeUser } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeUser("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeUser("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeUser("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeUser("admin"), deleteUser);
router.route("/userDetails/:id").get(getUserDetailsById);

module.exports = router;
