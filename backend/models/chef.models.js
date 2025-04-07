const mongoose = require('mongoose');

const chefSchema = mongoose.Schema (
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },Ò
    } , { timestamps: { createdAt: true}}
)

module.exports = mongosse.model('Chef', chefSchema)