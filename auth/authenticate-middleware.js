/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/


function restrict() {

  const authError = {
		message: 'You shall not pass!',
	}

	return async (req, res, next) => {
		try {


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