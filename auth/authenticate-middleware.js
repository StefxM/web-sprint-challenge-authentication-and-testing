/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const Users = require('../users/usersModel')

function restrict() {

  const authError = {
		message: 'You shall not pass!',
	}

	return async (req, res, next) => {
		try {
			const { username, password } = req.headers
			// make sure the values are not empty
			if (!username || !password) {
				return res.status(401).json(authError)
			}

			const user = await Users.find({ username }).first()
			console.log(user)
			// make sure user exists in the database
			if (!user) {
				return res.status(401).json(authError)
			}
			
			// compare the plain text password from the request body to the
			// hash we have stored in the database. returns true/false.
			const passwordValid = await bcrypt.compare(password, user.password)
			// make sure password is correct
			if (!passwordValid) {
				return res.status(401).json(authError)
			}


			if (!req.session || !req.session.user) {
				return res.status(401).json(authError)
			}

			// if we reach this point, the user is authenticated!
			next()
		} catch (err) {
			next(err)
		}
	}
}


module.exports = restrict