const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 20000,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 30,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
  },
 {timestamps: true}
);


module.exports = mongoose.model('Product', productSchema);