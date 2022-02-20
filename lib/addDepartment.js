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

class Department{
    constructor(department) {
        this.department = department;
    }

    addToDepartment() {
        db.query(`INSERT INTO department(name) VALUES ("${this.department}")`)
        console.log(" ")
        console.log(`-Added ${this.department} to the database-`)
        console.log("---Press Up or Down Arrow Key To Continue---")
    }
}

module.exports = Department;