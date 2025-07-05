const db = require("./../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 📋 get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");

    if (!users) {
      res.status(404).json({
        success: false,
        error: "no users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All users found",
      totalUsers: users[0].length,
      data: users[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "cannot get users",
      details: err.message,
    });
  }
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(404)
        .send({ success: false, error: "Invaled Provide id" });
    }
    const user = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);

    if (!user) {
      return res.status(404).json({ success: false, error: "No User Found" });
    }

    res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "cannot get user by id", details: err.message });
  }
};

// ➕ add new user
const addUser = async (req, res) => {
  try {
    const { userName, email, password, userType } = req.body;
    if (!userName || !email || !password || !userType) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = await db.query(
      "INSERT INTO users (userName, email, passwrd, userType) VALUES (?,?,?,?)",
      [userName, email, hashedPassword, userType]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error in creating user",
      });
    }

    res.status(201).send({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Cannot create user",
      details: err.message,
    });
  }
};

// 🔐 login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    const [userRows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userRows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = userRows[0];

    const isMatch = await bcrypt.compare(password, user.passwrd);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create and sign a JWT
    const token = jwt.sign({ id: user.userId, role: user.userType }, process.env.JWT_SECRET || 'your_default_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.userId,
        name: user.userName,
        email: user.email,
        role: user.userType,
        img: user.userImg,
        balance: user.balance,
        activity: user.activity,
        // orders: user.orders,
        // settings: user.settings,
        // listings: user.listings,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error during login",
      details: err.message,
    });
  }
};

// update user data

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const [userRows] = await db.query("SELECT * FROM users WHERE userId = ?", [
      userId,
    ]);
    if (userRows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const { userName, email, password, userType } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (userName) {
      updateFields.push("userName = ?");
      updateValues.push(userName);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (userType) {
      updateFields.push("userType = ?");
      updateValues.push(userType);
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.push("passwrd = ?");
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No fields to update",
      });
    }

    updateValues.push(userId);

    // Update query
    const data = await db.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE userId = ?`,
      updateValues
    );

    if (data[0].affectedRows === 0) {
      return res.status(500).send({
        success: false,
        message: "Error in updating user",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error: "Cannot update user",
      details: err.message,
    });
  }
};

// 🗑️delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).send({
        success: false,
        error: "Invalid user ID",
      });
     await db.query("DELETE FROM users WHERE userId = ?", [userId]);

    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Cannot delete user",
      details: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
};
