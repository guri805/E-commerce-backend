const Category = require("../Model/CreateCategory")
const slugify = require("slugify");
// console.log(Category);

// Create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(200).json({ success: false, message: "Category name is required", });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).json({ success: false, message: "Category already exists", });
        }

        const newCategory = await new Category({ name, slug: slugify(name), }).save();

        res.status(201).json({ success: true, message: "Category added successfully", newCategory });
    } catch (error) {
        console.error("Error while adding category:", error.message);
        res.status(500).json({ success: false, message: "Error while adding category", });
    }
}

// delete category

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(categoryId);
        if (!deleteCategory) {
            return res.status(200).json({ success: false, message: "catagory not found" });
        }
        res.status(200).json({ success: true, message: "category deleted successfully" });
    } catch (error) {
        console.error("Error while deleting category:", error.message);
        res.status(500).json({ success: false, message: "Error while deleting category", });
    }
}

// update/edit category 

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const updateData = {
            ...(name && { name }), 
            ...(name && { slug: slugify(name) }) 
        };
        const updateCategoryData = await Category.findByIdAndUpdate({ _id: categoryId }, updateData, { new: true })

        if (!updateCategoryData) {
            return res.status(200).json({ success: false, message: "category not found" });
        }
        res.status(200).json({ success: true, message: "category updated successfully", updateCategoryData })
    } catch (error) {
        console.error("Error while updating category:", error.message);
        res.status(500).json({ success: false, message: "Error while updating category", });
    }
}

module.exports = { createCategory, deleteCategory, updateCategory };