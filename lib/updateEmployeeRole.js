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

class UpdateEmployee {
    constructor (roles) {
        this.roles = roles
    }

    updateEmployee() {
        db.query(`UPDATE employee SET roles = "${this.roles}" WHERE `)
    }

}

module.exports = UpdateEmployee;