const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_sql',
    password: 'yn20@mysql'
});

let getRandomUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.password(),
        faker.internet.email()
    ]
};




let q = "INSERT INTO user (id, username, email, password) VALUES ? ";

let data = [];
for (let i = 1; i <= 100; i++) {
    // console.log(getRandomUser());
    data.push(getRandomUser());//100 fake users
}


try {
    connection.query(q, [data], (err, result) => {
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

