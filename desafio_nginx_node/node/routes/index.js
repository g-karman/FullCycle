var express = require('express');
var router = express.Router();
var db = require('../database');


function initDb() {

    createTables();
    insertPerson("John FullCycle - " + new Date().toISOString());

}

function createTables() {

    let createPeople = `create table if not exists people(
        id int primary key auto_increment,
        name varchar(255)not null
    )`;

    db.query(createPeople, function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;

        console.log("Tabela criada");

    });

}

function insertPerson(name) {

    db.query(`INSERT INTO people(name) values('${name}')`, function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;

        console.log(name + ' inserido com sucesso!');
    });
}


/* GET home page. */
router.get('/', function (req, res, next) {


    initDb();

    db.query('SELECT * FROM people ORDER BY id DESC', function (err, data, fields) {
        if (err) throw err;
        res.render('index', { title: 'Desafio FullCycle', userData: data });
    });

});

module.exports = router;
