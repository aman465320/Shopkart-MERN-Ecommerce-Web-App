const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "please fill the fields dumbass",
      });
    }

    let category = await Category.findOne({ name });

    if (category) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    category = new Category({
      name,
    });
    category.save();
    res.status(201).send({
      success: true,
      message: "Category Created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All categories fetched Successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

const singleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).send({
      success: true,
      message: "Category fetched Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};


module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  singleCategory,
  deleteCategory,
};
