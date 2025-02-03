import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect();

let currentUserId = null;

let users = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
 
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getInitialUser() {
  const result = await db.query("SELECT id FROM users ORDER BY id ASC LIMIT 1;");
  if (result.rows.length > 0) {
    currentUserId = result.rows[0].id;
  } else {
    currentUserId = null;
  }
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}


app.get("/", async (req, res) => {

  const countries = await checkVisited();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries : countries,
    total: countries.length,
    users : users,
    color: currentUser.color,
    });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();
  

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      const countries = await checkVisited(currentUser.id);
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "Country name does not exist, try again.",
      });
    }

    const countryCode = result.rows[0].country_code;

    const checkCountryExists = await db.query(
      "SELECT * FROM visited_countries WHERE country_code = $1 AND user_id = $2",
      [countryCode, currentUser.id]
    );

    if (checkCountryExists.rows.length > 0) {
      const countries = await checkVisited(currentUser.id);
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "Country has already been added, try again.",
      });
    }

    await db.query(
      "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
      [countryCode, currentUser.id]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    const countries = await checkVisited(currentUser.id);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error: "Something went wrong, please try again.",
    });
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

getInitialUser().then(() => {
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
});
