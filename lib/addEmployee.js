class Employee {
    constructor (firstname, lastname, title) {
        this.firstname = firstname,
        this.lastname = lastname,
        this.title = title
    }

    getFirstname() {
        return this.firstname
    }

    getLastname() {
        return this.lastname
    }

    getTitle() {
        return this.title
    }

}

module.exports = Employee;