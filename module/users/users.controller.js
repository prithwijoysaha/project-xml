import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import noSqlDb0Models from "../../databases/index.js";
import loginSchema from "./users.validator.js";

const { User } = noSqlDb0Models;

export const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: true,  message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    if (req.file) {
      if (user.profilePicture) {
        await fs.unlink(path.join(__dirname, user.profilePicture));
      }

      user.profilePicture = req.file.path;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};
