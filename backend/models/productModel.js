const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Please Enter Product Name"],
        trim: true,
    },
    description: {
        type:String,
        required:[true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product stock"],
        maxLength: [4, "Stock cannot exceed 9999"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {   
            user: {
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required: true,
            },
            name: {
                type: String,
                requires: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Product", productSchema);