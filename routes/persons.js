const express = require("express") //const express = require("express")
const router = express.Router()
const {fullListPersons, sortListPersons, personId, postPerson, putPerson, patchPerson, deletePerson} = require("../controllers/persons.js")

router.get("/", fullListPersons)
router.get("/sort", sortListPersons)
router.get("/:idPerson", personId)
router.post("/", postPerson)
router.put("/:idPerson", putPerson)
router.patch("/:idPerson", patchPerson)
router.delete("/:idPerson", deletePerson)

module.exports = router