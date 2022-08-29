const db = require("../config/database");

const postBlog = (req, res) => {
  const title = req.body.title;
  const bodyText = req.body.bodyText;
  const author = req.body.author;
  const date = req.body.date;
  db.query(
    "INSERT INTO posts (title, blogposts, author, date) VALUES (?,?,?,?)",
    [title, bodyText, author, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );

  res.send("CREATE BLOG");
};

const getAllBlogPosts = (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

const getOneBlogPost = (req, res) => {
  const { postId } = req.params;

  db.query(`SELECT * FROM posts WHERE id = ${postId} `, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

module.exports = { postBlog, getAllBlogPosts, getOneBlogPost };
