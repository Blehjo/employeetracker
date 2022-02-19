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

class Employee {
    constructor (firstname, lastname, title, roles) {
        this.firstname = firstname,
        this.lastname = lastname,
        this.title = title,
        this.roles = roles
    }

    addToEmployee() {
        db.query(`INSERT INTO employee(first_name, last_name, roles) VALUES ("${this.firstname}", "${this.lastname}", ${this.roles})`)
    }

}

module.exports = Employee;