const { sign, verify } = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

function createToken(user) {
  const accessToken = sign(
    { email: user.email, id: user.userid },
    process.env.TOKEN_SECRET
  );

  return accessToken;
}

const validateToken = (req, res, next) => {
  const accessToken = req.cookies[`access_token`];

  //check if they have an access token,if not decline access
  if (!accessToken) {
    return res.status(400).send({ login: false, message: "Not authenticated" });
  }

  //check if the token they have is valid
  try {
    const validToken = verify(accessToken, process.env.TOKEN_SECRET);

    //if token is valid, grant access
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch {
    return res.status(400).json({ err: err, auth: false });
  }
  next();
};

module.exports = { createToken, validateToken };
