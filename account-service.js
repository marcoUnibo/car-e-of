/* ACCOUNT TRANSPORT-SERVICE */
const express = require("express") //import express  from "express" (in package.json insert:   "type": "module",);
const app = express()

app.use(express.json())

const personsRouter = require("./routes/persons.js")
app.use("/api/persons" , personsRouter)

const searchRouter = require("./routes/search.js")
app.use("/api", searchRouter)

app.use(express.static("public"))

// This is an example to use a middleware with some system information for a location that not exist
const middleware = require("./middleware")
app.use("/persons", middleware) //in this way, we limit the use of middleware to only the end points (routes) with /persons
//app.use([middleware, middleware2, middleware3, auth,]) it is possible use more middleware for end point, creating an array of them
// app.use(express.json()) This middleware let us to read all the input json 
// app.get("/", middleware, (req, res) => {...}  it is a way to put single middleware for a specific end point

/* --------------------------------------------------------------------- */

const PORT  = 5050

app.get("/", (req, res) => {
	res.send("<h1>This is the root page of the account-service.js<br>You can go to <a href='/homepage'>homepage</a></h1>")
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
