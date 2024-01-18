const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
   host: 'localhost',
   user: 'example_user',
   password: 'P@ssw0rd@2023',
   database: 'loginsystem',
});
app.use(express.json());
app.use(
   cors({
       origin: ["http://login.backend1.com"],
       methods: ["GET", "POST"],
       credentials: true,
   })
);


app.get('/', (req, res) => {
   console.log("Hello from API");
});


app.post('/login', (req, res) => {
   let username = req.body.username;
   let password = req.body.password;
   console.log("body: "+ JSON.stringify(req.body));
   console.log("username: "+username);
   console.log("password: "+password);


   db.execute(
       "SELECT * FROM users WHERE username = ? AND password = ?",
       [username, password],
       (err, result) => {
           if (err) {
               res.send({ err: err });
           }
           if (result.length > 0) {
               res.send(result);
           } else
               res.send({ message: "Wrong username/password comination!" });
       }
   );
});
app.post('/register', (req, res) => {
   let username = req.body.username;
   let password = req.body.password;
   console.log("body: "+ JSON.stringify(req.body));
   console.log("username: "+username);
   console.log("password: "+password);
   db.execute(
       "INSERT INTO users (username, password) VALUES (?,?)",
       [username, password],
       (err, result) => {
           if (err) {
               res.send({ err: err });
           }
           res.send(result);
       }
   );
});


app.listen(4040, () => {
   console.log("running server");
});