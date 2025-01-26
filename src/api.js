require("dotenv").config({ path: "../.env" })
const OpenAI = require("openai")
const express = require("express")
const bodyParser = require("body-parser")
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

console.log(process.env.OPENAI_API_KEY)

const { Pool } = require('pg')

const app = express()

const PORT = 3000

// const context = "You provide SQL queries for a Toyota car search engine. Your table is 'toyota_vehicles' and it has the columns: id_no,image_url,shown_price,model_year,car_title,msrp,city_mpg,combination_mpg,cylinders,displacement,highway_mpg,is_gas,is_electric,is_fuel_cell,is_automatic,is_manual,is_awd,is_rwd,is_fwd,is_4wd,horsepower,is_standard_suv,is_small_suv,is_midsize,is_subcompact,is_compact,is_two_seater,is_minivan,is_small_pickup,is_standard_pickup. msrp has a range between 22000 and 62000. horsepower has a range between 0 and 290. Please provide a VALID SQL query matching the prompt provided, and AFTER PROVIDING THE SQL QUERY, a brief description of why you queried it that way. Structure your responses in VALID JSON ONLY -- (DO NOT PREFACE IT WITH ```json`), with `query` and `description`. Here is the prompt: "
const context = "You provide SQL queries for a Toyota car search engine. Your table is 'toyota_vehicles' and it has the columns: id_no,image_url,shown_price,model_year,car_title,msrp,city_mpg,combination_mpg,cylinders,displacement,highway_mpg,is_gas,is_electric,is_fuel_cell,is_automatic,is_manual,is_awd,is_rwd,is_fwd,is_4wd,horsepower,is_standard_suv,is_small_suv,is_midsize,is_subcompact,is_compact,is_two_seater,is_minivan,is_small_pickup,is_standard_pickup. You can ONLY use these columns. msrp has a range between 22000 and 62000. horsepower has a range between 0 and 290. All columns starting with 'is_' are boolean and should use true/false values. Please provide a VALID SQL query matching the prompt provided, and AFTER PROVIDING THE SQL QUERY, a brief description of why you queried it that way. Structure your responses in VALID JSON ONLY -- (DO NOT PREFACE IT WITH ```json`), with `query` and `description`. Here is the prompt: "

app.use(bodyParser.json())

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PORT,
});

pool.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err.stack));

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
  const query = JSON.parse(response.choices[0].message.content)
  const gpt_query = query.query
  const gpt_description = query.description
  console.log(gpt_query)
  try {
    const { rows } = await pool.query(gpt_query);
    console.log(rows)
    const package = res.json({
      data: rows,
      explanation: gpt_description
    });
    console.log(package)
  } catch (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Internal server error');
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
