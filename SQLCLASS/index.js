const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'router_dbsql',
    password: 'yn20@mysql'
})

const getrandomUsers = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password()
    ]
}

// let q = "INSERT INTO clients (id, username, email, password) VALUES ?"
// let data = [];
// for (let i = 1; i <= 100; i++) {
//     data.push(getrandomUsers());
// }


app.listen(port, (req, res) => {
    console.log(`app is running on ${port}`);
})

//Home Page
app.get('/', (req, res) => {
    let q = `select count(*) from clients`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]['count(*)'];
            res.render("home.ejs", { count })
            // res.send("SUCCESS")
            // res.send(result);
            // connection.end();
        })
    }
    catch (err) {
        console.log(err);
        res.send("some error in DB");
    }
})

// Show route
app.get('/user', (req, res) => {
    let q = `select * from clients`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render("show.ejs", { users })
            // console.log(users)
        })
    }
    catch (err) {
        console.log(err);
        res.send("some error in DB");
    }
})

//Edit Router
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `select * from clients where id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user })
            // console.log(result)
        })
    }
    catch (err) {
        console.log(err);
        res.send("some error in DB");
    }
    // console.log(id);

})

// update route
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let q = `select * from clients where id='${id}'`;
    let { password: formPassword, username: newuserName } = req.body
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPassword != user.password) {
                res.send("WRONG PASSWORD")
            } else {
                let q2 = `update clients set username='${newuserName}' where id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    // res.send(result);
                    res.redirect("/user")
                })
            }

            // console.log(result)
        })
    }
    catch (err) {
        console.log(err);
        res.send("some error in DB");
    }
})



