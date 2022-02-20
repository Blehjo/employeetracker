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
    constructor (name, roles) {
        this.roles = roles
        this.name = name
    }

    updatedEmployee() {
        db.query("SELECT id FROM roles WHERE title = ?", this.roles, (err, results) => {
            if (err) console.error(err);

            const [{ id }]  = results;

            db.query(`UPDATE employee SET roles = "${id}" WHERE first_name = ? and last_name = ?`, this.name.split(' '), (err, result) => {
                if (err) console.error(err);

                console.log(" ")
                console.log(`Succesfully Updated ${this.name}'s Role`)
                console.log("---Press Up or Down Arrow Key To Continue---")
            });
        });
    };

}

module.exports = UpdateEmployee;