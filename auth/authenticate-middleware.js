/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const JWT = require("jsonwebtoken");
const userDB = require("../models/usersModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const id = JWT.verify(token, process.env.SECRET);
    if (id) {
      const { password, ...user } = await userDB.findByID(id);
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Could not verify the token" });
  }
};
