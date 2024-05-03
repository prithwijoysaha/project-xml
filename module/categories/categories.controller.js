import noSqlDb0Models from "../../databases/index.js";

const { Category } = noSqlDb0Models;

const allCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
export default allCategories;
