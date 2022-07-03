const express = require("express")
const router = express.Router()
const {persone} = require("../persons")


router.get("/", (req, res) =>{
	const newPersons = persone.map((persona) =>{
		const {id, name, surname, role} = persona
		return {id, name, surname, role}
	})
	// res.send("This is the persons page. You can go to <a href='/'>Home</a>") REMEMBER: Each request may have only one response
	// res.send("This is the second persons page. You can go to <a href='/'>Home</a>") 
	res.status(200).json(newPersons) // to see all the information: res.json(persone)
	
})


router.get("/:idPerson", (req, res) => {
	console.log(req.params)
	const {idPerson} = req.params
	const singlePerson = persone.find((singlePerson) =>	singlePerson.id === idPerson) //if the id is a number, write: singlePerson.id === Number(id)

	if (!singlePerson){
		//return res.status(404).send("Person not found") REMEMBER: Each request may have only one response
		return res.status(404).send({message: "person not found", error: "404"})
	}
	res.json(singlePerson)
})

//The follow could be a situation of a request for a person that have some other information and I want only a detail
//like a single transport of that person and not all the transports. It could be something like that:
// app.get("/person/:idPerson/transports/:idTransport", (req, res)=>{...})



// Attention this post do not check anything about the new person pushed
router.post("/", (req, res) => {
	const singlePerson = req.body
	persone.push(singlePerson)
	res.status(200).json({success: true, data: persone})
})

router.put("/:idPerson", (req, res) => {
	const {idPerson} = req.params
	const singlePerson = req.body
	const index = persone.findIndex(singlePerson => singlePerson.id === idPerson)
	persone[index] = singlePerson //for changing all the data
//	persone[index].name = singlePerson.name // for changing only the name
	res.status(200).json({success: true, data: persone})

})

router.delete("/:idPerson", (req, res) => {
	const {idPerson} = req.params
	const index = persone.findIndex(singlePerson => singlePerson.id === idPerson)
	persone.splice(index,1)
	res.status(200).json({success: true, data: persone})
})

module.exports = router