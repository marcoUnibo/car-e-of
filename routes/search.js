const express = require("express")
const router = express.Router()
const {searchSurname, searchPersonRole, searchPersonId} = require("../controllers/search.js")

router.get("/searchPersonSurname", searchSurname)
router.get("/searchPersonRole", searchPersonRole)
router.get("/searchPersonId", searchPersonId)

module.exports = router