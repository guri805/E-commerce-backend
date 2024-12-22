const Product = require("../Model/CreateProduct")

const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body

        const product = await new Product(name, description, price, categoryId).save();

        res.status(201).json({ success: true, message: "product added successfull", product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "error while add product" });
    }
}

module.exports = createProduct;
