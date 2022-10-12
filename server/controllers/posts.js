const db = require("../config/database");

const postBlog = (req, res) => {
  const title = req.body.title;
  const bodyText = req.body.bodyText;
  const author = req.body.author;
  const date = req.body.dateAndTime.date;
  const time = req.body.dateAndTime.time;
  console.log(time);
  db.query(
    "INSERT INTO posts (title, blogposts, author, date,time) VALUES (?,?,?,?,?)",
    [title, bodyText, author, date, time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
      }
    }
  );

  res.send("Blog Created");
};

const getAllBlogPosts = (req, res) => {
  console.log(req.body.id);
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const getOneBlogPost = (req, res) => {
  const { postId } = req.params;

  db.query(`SELECT * FROM posts WHERE id = ${postId} `, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.send(result);
    }
  });
};

const deleteOneBlogPost = (req, res) => {
  const id = req.body.id;

  db.query("DELETE FROM posts WHERE id = ?", [id], (err, response) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("Blog Post Deleted");
};

const updateBlogPost = (req, res) => {
  const { postId } = req.params;
  const title = req.body.title;
  const blogpost = req.body.bodyText;

  db.query(
    "UPDATE posts SET title = ?, blogposts = ? WHERE id = ?",
    [title, blogpost, postId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Failed");
      }
      res.send("Update succesfull");
    }
  );
};

module.exports = {
  postBlog,
  getAllBlogPosts,
  getOneBlogPost,
  deleteOneBlogPost,
  updateBlogPost,
};
