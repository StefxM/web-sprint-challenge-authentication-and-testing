/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

function restrict() {

  
    return async (req, res, next) => {
      const authError = {
        message: "Invalid credentials",
      }
  
      try {
        // token is coming from the client's cookie jar, in the "Cookie" header
        const token = req.cookies.token
        //console.log(token)
        if (!token) {
          return res.status(401).json(authError)
        }
  
        // decode the token, re-sign the payload, and check if signature is valid
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json(authError)
          }
          next()
        })
      } catch(err) {
        next(err)
      }
    }
  }


module.exports = {
  restrict,
}
