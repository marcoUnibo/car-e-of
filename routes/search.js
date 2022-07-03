const express = require("express")
const router = express.Router()
const {persone} = require("../persons")


router.get("/searchPersonSurname", (req, res) => {
	const { query, limit} = req.query
	let personsFiltered = [...persone]
	if (query) {
		personsFiltered = personsFiltered.filter((person) => {
			return person.surname.startsWith(query)
		})
	}
	if (limit){
		personsFiltered = personsFiltered.slice(0, Number(limit))
	}
	if (personsFiltered.length < 1) {
		//console.log("yes")
		return res.status(200).json({Search: true, data: "empty"})
	}
	res.status(200).json(personsFiltered)
	// example how to write the query on the browser: http://127.0.0.1:5050/searchperson?query=M&limit=1
})

router.get("/searchPersonRole", (req, res) => {
	const { query, limit} = req.query
	let personsFiltered = [...persone]
	if (query) {
		personsFiltered = personsFiltered.filter((person) => {
			return person.role.startsWith(query)
		})
	}
	if (limit){
		personsFiltered = personsFiltered.slice(0, Number(limit))
	}
	if (personsFiltered.length < 1) {
		//console.log("yes")
		return res.status(200).json({Search: true, data: "empty"})
	}
	res.status(200).json(personsFiltered)
	// example how to write the query on the browser: http://127.0.0.1:5050/searchperson?query=M&limit=1
})

router.get("/searchPersonId", (req, res) => {
	const { query, limit} = req.query
	let personsFiltered = [...persone]
	if (query) {
		personsFiltered = personsFiltered.filter((person) => {
			return person.id.startsWith(query)
		})
	}
	if (limit){
		personsFiltered = personsFiltered.slice(0, Number(limit))
	}
	if (personsFiltered.length < 1) {
		//console.log("yes")
		return res.status(200).json({Search: true, data: "empty"})
	}
	res.status(200).json(personsFiltered)
	// example how to write the query on the browser: http://127.0.0.1:5050/searchperson?query=M&limit=1
})

module.exports = router