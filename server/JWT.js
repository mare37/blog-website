const { sign, verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//app.use(cookieParser());

function createToken(user) {
  const accessToken = sign({ email: user.email, id: user.userid }, "12uuy34");

  return accessToken;
}

const validateToken = (req, res, next) => {
  // const accessToken = "";

  const accessToken = req.cookies[`access_token`];
  //const accessToken = "";
  //console.log(accessToken);

  if (!accessToken) {
    return res.status(400).send({ login: false, message: "Not authenticated" });
  }

  //check if they have a valid token
  try {
    const validToken = verify(accessToken, process.env.TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch {
    return res.status(400).json({ err: err });
  }
  next();
};

module.exports = { createToken, validateToken };
