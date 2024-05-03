export default (model, Schema) => {
  const QuestionSchema = new Schema(
    {
      question: {
        type: String,
        required: true,
      },
      categories: [
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
    },
    {
      collection: "questions",
      timestamps: {
        createdAt: true,
        updatedAt: true,
        timezone: "UTC",
      },
    }
  );
  return model("Question", QuestionSchema);
};
