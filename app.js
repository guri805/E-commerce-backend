const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;
mongoose
  .connect("mongodb://localhost:27017/Ecommerce")
  .then(async () => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log("Fail to connect mongodb", err);
  });

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    mobile: { type: Number, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { name, email, password, address, mobile } = req.body;
  try {
    if (name === "") {
      return res.status(200).send({ message: "Name field is  required" });
    } else if (email === "") {
      return res.status(200).send({ message: "Email field is required" });
    } else if (password === "") {
      return res.status(200).send({ message: "Password field is required" });
    } else if (address === "") {
      return res.status(200).send({ message: "Adress field is required" });
    } else if (mobile === "") {
      return res.status(200).send({ message: "Mobile field is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        Message: "User already existed",
      });
    }
    const newUser = await new User({
      name,
      email,
      password,
      address,
      mobile,
    }).save();
    res
      .status(201)
      .json({ success: true, Message: "User Created Sucessfully", newUser });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === "") {
      return res.status(200).send('email is required')
    }
    if (password === "") {
      return res.status(200).send('password is required')
    }
    if (!email || !password) {
      res.status(200).send("email and password not found")
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).send({
        Message: "User not registered",
      });
    }
    const check = password === existingUser.password
    if (!check) {
      return res.status(200).send({ sucess: false, message: "password is invalid" })
    }
    res.status(200).json({
      success: true,
      message: "login successful",
      user: {
        name: existingUser.name,
        mobile: existingUser.mobile,
        email: existingUser.email,
        address: existingUser.address,
        role: existingUser.role,
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "error while login" })

  }
})
app.listen(PORT, () => console.log(`Server running on Port :${PORT}`));
