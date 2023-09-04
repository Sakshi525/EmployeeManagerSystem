const bcrypt = require('bcrypt');
const User = require('../models/user-model')
const Manager = require('../models/manager-model');
const Department = require('../models/department-model');

exports.managerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await User.findOne({ email });
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    if (manager.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const token = 'generate_token_here';
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//Create department
exports.createDepartment = async (req, res) => {
  try {
    const { departmentName, categoryName, location, salary } = req.body;
    const department = new Department({
      departmentName,
      categoryName,
      location,
      salary,
      employees_ids: [],
    });

    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
    // res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a department
exports.updateDepartments = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { departmentName, categoryName, location, salary } = req.body;
    const department = await Department.findOne({ _id: departmentId });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    department.departmentName = departmentName;
    department.categoryName = categoryName;
    department.location = location;
    department.salary = salary;
    await department.save();
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a department
exports.deleteDepartments = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const deletedDepartment = await Department.findOneAndDeletez({ _id: departmentId });
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(deletedDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign employees to a department
exports.assignEmployees = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { employeeIds } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    department.employees = employeeIds;
    await department.save();
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get departments in paginated format
exports.listOfDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const perPage = 5; // Number of departments to display per page

    const totalDepartments = await Department.countDocuments();
    const totalPages = Math.ceil(totalDepartments / perPage);

    const departments = await Department.find()
      .skip((page - 1) * perPage) // Calculate the skip based on the page number
      .limit(perPage); // Limit the number of results per page

    res.json({
      departments,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
