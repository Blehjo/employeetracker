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

// function viewEmployee() {
//     db.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS titles, department.name AS department, roles.salary AS salary, employee.manager, supervisor. FROM employee JOIN roles ON employee.roles = roles.id JOIN department ON roles.department = department.id LEFT JOIN employee supervisor ON employee.manager = supervisor.id`, function (err, results) {
//         const table = cTable.getTable(results);
//         console.log(" ")
//         console.log(table);
//         console.log("Showing Employee Table")
//         console.log("---Press Up or Down Arrow Key To Continue---")
//     })
// }

function viewEmployee() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary AS salary, supervisor.last_name AS manager_name FROM employee JOIN roles ON employee.roles = roles.id JOIN department ON roles.department = department.id LEFT JOIN employee supervisor ON employee.manager = supervisor.id`, function (err, results) {
        const table = cTable.getTable(results);
        console.log(" ")
        console.log(table);
        console.log("Showing Employee Table")
        console.log("---Press Up or Down Arrow Key To Continue---")
    })
}

// function viewEmployee() {
//     db.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS titles, department.name AS department, roles.salary AS salary, employee.manager AS manager FROM employee JOIN roles ON employee.roles = roles.id JOIN department ON roles.department = department.id LEFT JOIN employee supervisor ON employee.manager = supervisor.id`, function (err, results) {
//         const table = cTable.getTable(results);
//         console.log(" ")
//         console.log(table);
//         console.log("Showing Employee Table")
//         console.log("---Press Up or Down Arrow Key To Continue---")
//     })
// }

module.exports = viewEmployee;