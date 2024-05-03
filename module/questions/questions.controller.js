import fs from 'fs';
import csvParser from 'csv-parser';
import noSqlDb0Models from "../../databases/index.js";

const { Question, Category } = noSqlDb0Models;

export const listQuestionByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const questions = await Question.find({ categories: categoryId });

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const addQuestionByCSV = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: true, message: "No file provided" });
  }

  try {
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", async (row) => {
       
        const { question, categories } = row;
        try {
          const categoryObjects = await Category.aggregate([
            { $match: { name: { $in: [categories.trim()] } } },
            { $project: { _id: 1 } },
          ]);
          const categoryIds = categoryObjects.map((category) => category._id);

          const questionData = {
            question: question.trim(),
            categories: categoryIds,
          };
          await Question.create(questionData);
        } catch (error) {
          console.error("Error retrieving category IDs:", error);
        }
      })
      .on("end", async () => {
        return res
          .status(201)
          .json({ message: "Questions imported successfully" });
      });
  } catch (error) {
    console.error("Error parsing CSV file:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};
