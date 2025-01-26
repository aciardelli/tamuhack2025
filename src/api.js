require("dotenv").config({ path: "../.env" })
const OpenAI = require("openai")
const express = require("express")
const bodyParser = require("body-parser")
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

console.log(process.env.OPENAI_API_KEY)


const app = express()

const PORT = 3000

const context = "You provide SQL queries for a Toyota car search engine. Please provide a SQL query matching the prompt provided, and AFTER PROVIDING THE SQL QUERY, a brief description of why you queried it that way. Structure your responses in JSON, with `sql query` and `description`. Here is the prompt: "

app.use(bodyParser.json())


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.get("/api/sayHi", (req, res) => {
  res.send("Hello world")
})



app.post("/api/userSearch", async (req, res) => {
  const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: context + req.body.query}],
      model: 'gpt-4o-mini'
  });

  res.send(response)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
