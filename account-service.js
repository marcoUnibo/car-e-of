/* ACCOUNT MICRO-SERVICE */
  
const express  = require("express");
const app = express()

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

const axios = require("axios");

const personsRouter = require("./routes/persons")
app.use("/api/persons" , personsRouter)

const searchRouter = require("./routes/search")
app.use("/api",searchRouter)
//const { resetWatchers } = require("nodemon/lib/monitor/watch");


app.use(express.static("public"))

const middleware = require("./middleware")
app.use("/persons",middleware) //in this way, we limit the use of middleware to only the end points (routes) with /persons
//app.use([middleware, middleware2, middleware3, auth,]) it is possible use more middleware for end point, creating an array of them
// app.use(express.json()) This middleware let us to read all the input json 

/* --------------------------------------------------------------------- */

const PORT  = 5050

var model = require('./account-model'); //TO DEL


// app.get("/", middleware, (req, res) => {...}  it is a way to put single middleware for a specific end point

app.get("/", (req, res) => {
	res.send("This is the account service. You can go to <a href='/persons'>persone</a>")
})


// Create a static public page HTML (see express send html page)
app.get("/homepage", async (req, res) =>{
	res.sendFile("homepage.html", {root: __dirname + "/public"})
})


// This is the last app if your request is wrong. Two different situation
// first simple response: res.send("<h1>Page not found</h1>")
// second with res.SendFile to a static page


app.all("*", (req, res) => {
	res.sendFile("404_error.html", {root: __dirname + "/public"}) 
})

//-----------------------------------------------------------------------------

app.listen(PORT, () => {
	console.log("Account service up and running - listening on port " + PORT)
})
