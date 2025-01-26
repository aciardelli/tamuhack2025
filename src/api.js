require("dotenv").config({ path: "../.env" })
const OpenAI = require("openai")
const express = require("express")
const bodyParser = require("body-parser")
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

console.log(process.env.OPENAI_API_KEY)

const { Pool } = require('pg')

const app = express()

const PORT = 3000

const context = "You provide SQL queries for a Toyota car search engine. Please provide a SQL query matching the prompt provided, and AFTER PROVIDING THE SQL QUERY, a brief description of why you queried it that way. Structure your responses in JSON, with `query` and `description`. Here is the prompt: "

app.use(bodyParser.json())

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'OPTIONS']
}));

app.get("/api/sayHi", (req, res) => {
  res.send("Hello world")
})

// app.post("/api/userSearch", async (req, res) => {
//   const response = await client.chat.completions.create({
//       messages: [{ role: 'user', content: context + req.body.query}],
//       model: 'gpt-4o-mini'
//   });

//   res.send(response)
// })

app.post("/api/userSearch", async (req, res) => {
  const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: context + req.body.query}],
      model: 'gpt-4o-mini'
  });
  const gpt_query = response.choices[0].message.content.query;
  const gpt_explanation = response.choices[0].message.content.explanation;
  try {
    const { rows } = await pool.query(gpt_query);
    return res.json({
      data: rows,
      explanation: gpt_explanation
    });
  } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Internal server error');
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
