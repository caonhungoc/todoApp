const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require('config');

const jwtSignature = config.get('jwtSignature');

const auth = () => async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. 
    // If not, it will be called with the error.
    const decoded = await jwt.verify(token, jwtSignature);

    // find user have admin right
    const foundedUser = await User.findOne({
      _id: decoded._id,
      user_type: "admin"
    });

    if (!foundedUser)
      return res.status(401).send({ message: "you are not authorized!!" });

    req.user = foundedUser;
    req.token = token;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "you are not authorized!!" });
  }
};

module.exports = {
  auth,
};