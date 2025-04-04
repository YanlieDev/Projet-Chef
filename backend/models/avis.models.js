const mongoose = require('mongoose');

const avisSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            minLength: 3,
            maxLength: 280,
            required: true
        }
    } , { timestamps: { createdAt: true} }
)
module.exports = mongoose.model('avis', avisSchema )