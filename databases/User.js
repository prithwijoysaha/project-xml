export default (model, Schema) => {
  const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
    },
    {
      collection: "users",
      timestamps: {
        createdAt: true,
        updatedAt: true,
        timezone: "UTC",
      },
    }
  );
  return model("User", UserSchema);
};
