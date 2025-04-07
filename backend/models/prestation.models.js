const mongoose = require('mongoose');

const prestationSchema = mongoose.Schema(
    {
        isValided: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            required: true
        },
    } , { timestamps: { createdAt: true}}
)

module.exports = mongoose.model('Prestation', prestationSchema)