var mongoose              = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    deadline: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    complete: {
        type: Date,
    },
    color: {
        type: String,
    },
    user: {
        type: String,
        required: true
    }
});

var Task = module.exports = mongoose.model('Task', taskSchema, 'tasks');
module.exports = Task;
