const { checkSchema } = require("express-validator");

exports.createStudentSchema = checkSchema({
    first_name: {
        in: ['body'],

        notEmpty: {
            errorMessage: 'First Name is required'
        },
        isString: {
            errorMessage: 'Name Should Be a string'
        },
        isLength: {
            options: {min: 3},
            errorMessage: 'Name should be longer than 2 characters'
        },
        trim: true,
        
        escape: true,
    },

    last_name: {
        in: ['body'],

        notEmpty: {
            errorMessage: 'First Name is required'
        },
        isString: {
            errorMessage: 'Name Should Be a string'
        },
        isLength: {
            options: {min: 3},
            errorMessage: 'Name should be longer than 2 characters'
        },
        trim: true,
        
        escape: true,
    },

    age: {
        in: ['body'],

        notEmpty: {
            errorMessage: "Age is required"
        },
        isInt: {
            min: 18,
            max: 80,
            errorMessage: 'Age should be between 18 and 80',
        },
    },


    is_graduated: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Graduated condition needs to be a boolean',
        },
        optional: true,
    },
    
    gpa: {
        in:['body'],
        notEmpty: {
            errorMessage: 'gpa is required',
        },
        isFloat: {
            min: 0.0,
            max: 4.0,
            errorMessage: 'GPA should be between 0.0 and 4.0',
        },
    }
});

exports.deleteSchema = checkSchema({
    id: {
        in: ['params'],
        toInt: true,
        notEmpty: {
            errorMessage: 'Student Id is required',
        }
    }
});

exports.searchSchema = checkSchema({

    name: {
        in: ['query'],
        optional: true,
        isString: {
            errorMessage: 'Name Should Be a string'
        },
        
        trim: true,
        
        escape: true,
    },
    age: {
        in: ['query'],
        optional: true,
        toInt: true,
        isInt: true,
    },
    gpa: {
        in: ['query'],
        optional: true,
        toFloat: true,
        isFloat: true,
    }
});

exports.getStudentByIdSchema = checkSchema({
    id: {
        in: ['params'],
        
        notEmpty: {
            errorMessage: 'Student Id is required',
        },

        isInt: {
            min: 1,
            max: 1000000,
            errorMessage: 'Id should be a positive integer',
        },
        
        toInt: true,
        
    }
});