const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        description: { type: String },
        price: { type: Number },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;