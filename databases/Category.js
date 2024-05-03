export default (model, Schema) => {
  const CategorySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
    },
    {
      collection: "categories",
      timestamps: {
        createdAt: true,
        updatedAt: true,
        timezone: "UTC",
      },
    }
  );
  return model("Category", CategorySchema);
};
