const express = require("express");
const router = express.Router();
const cors = require("cors");
const { validateToken } = require("../JWT");

const {
  postBlog,
  getAllBlogPosts,
  getOneBlogPost,
  deleteOneBlogPost,
  updateBlogPost,
} = require("../controllers/posts");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

//Post blog to database
router.post("/", validateToken, postBlog);

//Get all blogposts from database
router.get("/", getAllBlogPosts);

//Get one specific blogpost from the database
router.get("/:postId", getOneBlogPost);

//Delete one specific blogpost from the database
router.delete("/", validateToken, deleteOneBlogPost);

//Update specific blogpost
router.put("/:postId", validateToken, updateBlogPost);

module.exports = router;
