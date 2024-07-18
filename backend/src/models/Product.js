const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: {
        type: String,
        trim: true,
        required: [true, "Brand is required"]
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"]
    },
    availability: {
      type: Boolean,
      default: true,
      required: [true, "Availability is required"]
    },
    onSale: {
      type: Boolean,
      default: false,
      required: false
    },
    previousPrice: {
      type: Number,
      required: false
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"]
    },
    colors: {
        type: [String],
        trim: true,
        required: [true, "Color is required"]
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Category is required"],
        enum: {
            values: ["Computers", "SmartWatch", "Camera", "Headphones", "Phones", "Gaming"],
            message: "{VALUE} is an invalid category"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },

    images: {
        type: [String],
        required: [true, "Images are required"]
    }
});

module.exports = mongoose.model('Product', productSchema);
