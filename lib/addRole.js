class Role{
    constructor(role, salary, department) {
        this.role = role;
        this.salary = salary;
        this.department = department;
    }
    
    getRole() {
        return this.role;
    };

    getSalary() {
        return this.salary;
    };

    getDepartment() {
        return this.department;
    };
}

module.exports = Role;