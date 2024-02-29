const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_sql',
    password: 'yn20@mysql'
});

// let q = "SHOW TABLES"
// Inserting new data
// let q = "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123", "123_newUser", "abc@gmail.com", "abc"];
let q = "INSERT INTO user (id, username, email, password) VALUES ? ";
let users = [
    ['1235', '1235_newUser', 'abchj@gmail.com', 'abctut'],
    ['1234', '1234_newUser', 'abcd@gmail.com', 'abbcd']
]


try {
    connection.query(q, [users], (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log(result.length)
        console.log(result[1])
    });
}
catch (err) {
    console.log(err);
}

connection.end();

let getRandomUser = () => {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    };
};

// console.log(getRandomUser());