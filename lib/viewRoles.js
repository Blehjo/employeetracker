const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1!',
        database: 'company_db'
    }
)

function viewRoles() {
    db.query(`SELECT roles.id AS id, roles.title AS title, department.name AS department, roles.salary AS salary FROM roles JOIN department ON roles.department = department.id`, function (err, results) {
        const table = cTable.getTable(results);
        console.log(" ")
        console.log(table);
        console.log("Showing Roles Table")
    })
}


module.exports = viewRoles;