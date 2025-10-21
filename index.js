const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb",
  password: "12143786a!A",
});

let randomUsers = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

/*
let randomUsers = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
console.log(randomUsers());

let q = "Insert into users (id, username, email, password) values (?,?,?,?)";

let values = [101, "dinakar", "dinakarparul@gmail.com", "dinnu123"];


let q = "insert into users (id, username, email, password) values ?";

let values = [
  [104, "amrutha", "amrutha1@gmail.com", "amrutha456"],
  [105, "varun", "varun1@gmail.com", "varun789"],
];

*/

/*

let q = "insert into users (id,username,email,password) values ?";

let data = [];

for (let i = 0; i < 50; i++) {
  data.push(randomUsers());
}

connection.query(q, [data], (err, results) => {
  try {
    if (err) throw err;
    console.log(results);
  } catch (err) {
    console.log("Error occurred:", err.message);
  }
});

connection.end();
*/

/*
//Home Route
app.get("/", (req, res) => {
  let q = "select count(*) from users";
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send("Total users:" + results[0]["count(*)"]);
    });
  } catch (err) {
    console.log("Error occurred:", err.message);
    res.send("Error occurred:" + err.message);
  }
});
*/

//user route
app.get("/", (req, res) => {
  let q = "select count(*) as count from users";

  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      console.log(results);
      let count = results[0].count;
      res.render("home", { count });
    });
  } catch (err) {
    console.log("Error occurred:", err.message);
    res.send("Error occurred:" + err.message);
  }
});

app.get("/users", (req, res) => {
  let q = "select * from users";

  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers", { users });
    });
  } catch (err) {
    console.log("Error occurred:", err.message);
    res.send("Error occurred:" + err.message);
  }
});

app.listen("8080", () => {
  console.log("Server is running on port 8080");
});
