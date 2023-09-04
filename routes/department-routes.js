const express = require('express');
const router = express.Router();

const { managerLogin, createDepartment, getAllDepartments, updateDepartments, deleteDepartments, assignEmployees, listOfDepartments } = require('../controller/departments-controllers')

router.post('/login', managerLogin);
router.post('/createdepartments', createDepartment);
router.get('/getAlldepartments', getAllDepartments);
router.put('/updatedepartments/:departmentId', updateDepartments);
router.delete('/deletedepartments/:departmentId', deleteDepartments);
router.post('/assigndepartments/:departmentId/assign', assignEmployees);
router.get('/listofdepartments/', listOfDepartments);

module.exports = router;