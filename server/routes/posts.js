const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  postBlog,
  getAllBlogPosts,
  getOneBlogPost,
} = require("../controllers/posts");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

//Post blog to database
router.post("/", postBlog);

//Get all blogposts from database
router.get("/", getAllBlogPosts);

//Get one specific blogpost from the database
router.get("/:postId", getOneBlogPost);

module.exports = router;
