const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'chef', 'superAdmin'],
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            required: true,
            minLength: 12
        }
    } , { timestamps: { createdAt: true }} 
)
module.exports = mongoose.model('User', userSchema)