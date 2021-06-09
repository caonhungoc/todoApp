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

    // find user have right to access
    const foundUser = await User.user.findAll({
      where: {
        id: decoded.id
      }
    });

    if (!foundUser)
      return res.status(401).send({ message: "you are not authorized!!" });

    req.user = foundUser[0];
    req.token = token;

    if(1 === foundUser[0].roleID) { // admin role
      req.role = "admin";
    } else if(2 === foundUser[0].roleID) { // basic role
      req.role = "basic";
    } else {
      req.role = "unknown";
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "you are not authorized!!" });
  }
};

module.exports = {
  auth,
};