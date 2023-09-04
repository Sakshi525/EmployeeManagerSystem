const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String
    },
    categoryName: {
        type: String
    },
    location: {
        type: String
    },
    salary: {
        type: Number
    },
  employees_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

module.exports = mongoose.model('Department', departmentSchema);
