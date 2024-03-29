
let { persone } = require("../persons.js") //let and not const otherwise it is not possible to delete

const fullListPersons = (req, res) => {
	// res.send("This is the persons page. You can go to <a href='/'>Home</a>") REMEMBER: Each request may have only one response
	// res.send("This is the second persons page. You can go to <a href='/'>Home</a>") 
	res.status(200).json({ success: true, data: persone }) // to see all the information: res.json(persone)

}

const sortListPersons = (req, res) => {
	const newPersons = persone.map((persona) => {
		const { id, name, surname, role } = persona
		return { id, name, surname, role }
	})
	// res.send("This is the persons page. You can go to <a href='/'>Home</a>") REMEMBER: Each request may have only one response
	// res.send("This is the second persons page. You can go to <a href='/'>Home</a>") 
	res.status(200).json(newPersons) // to see all the information: res.json(persone)

}

const personId = (req, res) => {
	const { idPerson } = req.params
	const singlePerson = persone.find((singlePerson) => singlePerson.id === idPerson) //if the id is a number, write: singlePerson.id === Number(id)
	if (!singlePerson) {
		//return res.status(404).send("Person not found") REMEMBER: Each request may have only one response
		return res.status(404).send({ message: "person not found", error: "404" })
	}
	res.json(singlePerson)
} //The follow could be a situation of a request for a person that have some other information and I want only a detail
//like a single transport of that person and not all the transports. It could be something like that:
// app.get("/person/:idPerson/transports/:idTransport", (req, res)=>{...})

const postPerson = (req, res) => { // Attention this post do not check anything about the new person pushed
	const singlePerson = req.body
	for (let i in persone) {
		if (req.body.id == persone[i].id) {
			res.status(404).json({ success: false, data: persone })
			return
		}
	}
	persone.push(singlePerson)
	res.status(200).json({ success: true, data: persone })
}


const putPerson = (req, res) => {
	const { idPerson } = req.params
	const singlePerson = req.body
	const index = persone.findIndex(singlePerson => singlePerson.id === idPerson)
	persone[index] = singlePerson //for changing all the data
	//	persone[index].name = singlePerson.name // for changing only the name
	res.status(200).json({ success: true, data: persone })

}

const patchPerson = (req, res) => {
	const { idPerson } = req.params
	//const { name, surname} = req.body
	const {userid, name, surname, address: {street, town, province, CAP}, Tel, role} = req.body
	let personFind = persone.find((person) => person.id == idPerson)
	if (name) personFind.name = name;
	if (surname) personFind.surname = surname;
	if (street) personFind.address.street = street
	if (Tel) personFind.address.Tel = Tel
	//persone = persone.filter((person) => person.id != idPerson)
	res.status(200).json({ success: true, data: persone })
}

const deletePerson = (req, res) => {
	const { idPerson } = req.params
	persone = persone.filter((person) => person.id != idPerson)
	res.status(200).json({ success: true, data: persone })
}
 
module.exports = {fullListPersons, sortListPersons, personId, postPerson, putPerson, patchPerson, deletePerson}