const middleware = (req, res, next) => {
	const {method, url} = req
	const time = new Date().getMinutes()
	console.log(method, url, time)
	next()
}

module.exports = middleware