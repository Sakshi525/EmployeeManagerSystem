
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    gender: {
        type: String,
    },
    hobbies: {
        type: [String],
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isManager: {
        type: Boolean
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
}
)

let User = mongoose.model('users', userSchema);
module.exports = User;