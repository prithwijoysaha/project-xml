export default (model, Schema) => {
  const ContactSchema = new Schema(
    {
      name: {
        type: [String],
        required: false,
        nullable: true,
      },
      lastName: {
        type: [String],
        required: false,
        nullable: true,
      },
      phone: {
        type: [String],
        required: false,
        nullable: true,
      },
    },
    {
      collection: "contacts",
      timestamps: {
        createdAt: true,
        updatedAt: true,
        timezone: "UTC",
      },
    }
  );
  return model("Contact", ContactSchema);
};
