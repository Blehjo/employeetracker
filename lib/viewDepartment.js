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

function viewDepartment() {
    db.query(`SELECT department.id AS id, department.name AS name FROM department`, function (err, results) {
        const table = cTable.getTable(results);
        console.log(" ")
        console.log(table);
        console.log("Showing Department Table")
    })
}


module.exports = viewDepartment;