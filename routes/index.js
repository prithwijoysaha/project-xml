import express from "express";
var router = express.Router();
import {
  login,
  profile,
  editProfile,
} from "../module/users/users.controller.js";
import allCategories from "../module/categories/categories.controller.js";
import {
  listQuestionByCategory,
  addQuestionByCSV,
} from "../module/questions/questions.controller.js";
import { uploadImage, uploadCSV } from "../middlewares/upload.js";

router.get("/", function (req, res, next) {
  res.render("index.ejs");
});

// 1) User login
router.post("/login", async function (req, res, next) {
  return await login(req, res);
});

// 2) View user profile
router.get("/profile/:userId", async function (req, res, next) {
  return await profile(req, res);
});

// 3) Edit user profile (with profile picture)
router.patch(
  "/profile/:userId",
  uploadImage.single("profilePicture"),
  async function (req, res, next) {
    return await editProfile(req, res);
  }
);

// 4) All Categories
router.get("/categories", async function (req, res, next) {
  return await allCategories(req, res);
});

// 5) List of questions for each category
router.get("/questions/category/:categoryId", async function (req, res, next) {
  return await listQuestionByCategory(req, res);
});

// 6) Add question in bulk against different category (using a CSV file import).
router.post(
  "/questions",
  uploadCSV.single("questionCSV"),
  async function (req, res, next) {
    return await addQuestionByCSV(req, res);
  }
);

export default router;
