const db = require("../config/database");
const logger = require("../logger")

const postBlog = (req, res) => {
  const title = req.body.title;
  const bodyText = req.body.bodyText;
  const author = req.body.author;
  const date = req.body.dateAndTime.date;
  const time = req.body.dateAndTime.time;
  console.log(time)
  db.query(
    "INSERT INTO posts (title, blogposts, author, date,time) VALUES (?,?,?,?,?)",
    [title, bodyText, author, date, time],
    (err, result) => {
      if (err) {
       // console.log(err);
       // logger.error( JSON.stringify(err)  );
       logger.error(   JSON.stringify( {method: 'POST', route:'/blogpost', err: err} ));
      
      } else {
        logger.info(  JSON.stringify( {method: 'POST', route:'/blogpost', info: 'Blog posted sucessfully'} )    )
        res.send(result).status(200);
      }
    }
  );
    
};

const getAllBlogPosts = (req, res) => {
  console.log(req.body.id);
  db.query("SELECT * FROM posts", (err, result) => {
    if (err) {
     // console.log(err);
      logger.error(   JSON.stringify( {method: 'GET', route:'/blogpost', err: err} ));
      res.send("Something went wrong!").status(500);
    } else {
      logger.info(  JSON.stringify( {method: 'POST', route:'/blogpost', info: 'All blogs retrieved succesfully'} )    )
      res.send(result).status(200);
    }
  });
};


const getOneBlogPost = (req, res) => {
  const { postId } = req.params;

  console.log(postId);

  db.query(`SELECT * FROM posts WHERE posts_id = ?`,[postId], (err, result) => {
    if (err) {
      //console.log(err);
      logger.error(   JSON.stringify( {method: 'GET', route:'/blogpost/:postId', err: err} ));
      res.send("Something went wrong!").status(500);
    } else {
      //console.log(result);
      logger.info(  JSON.stringify( {method: 'GET', route:'/blogpos/:postId', info: 'Blog retrieved succesfully'} )    )
      res.send(result).status(200);
    }
  });
};

const deleteOneBlogPost = (req, res) => {
  const id = req.body.id;

  db.query("DELETE FROM posts WHERE id = ?", [id], (err, response) => {
    if (err) {
      //console.log(err);
      logger.error(   JSON.stringify( {method: 'DELETE', route:'/blogpost', err: err} ));
      res.send("Something went wrong!").status(500);
    }else{
      logger.info(  JSON.stringify( {method: 'DELETE', route:'/blogpos', info: 'Blog deleted'} )    )
      res.send(result).status(200);
    }
  });

  
};

const updateBlogPost = (req, res) => {
  const { postId } = req.params;
  const title = req.body.title;
  const blogpost = req.body.bodyText;

  db.query(
    "UPDATE posts SET title = ?, blogposts = ? WHERE posts_id = ?",
    [title, blogpost, postId],
    (err, result) => {
      if (err) {
       // console.log(err);
        logger.error(   JSON.stringify( {method: 'PUT', route:'/blogpost/postId', err: err} ));
        res.send("Something went wrong!").status(500);
      }else{
        logger.info(  JSON.stringify( {method: 'PUT', route:'/blogpost/postId', info: 'Blog updated successfully'} )    )
        res.send(result).status(200);

      }
      
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
