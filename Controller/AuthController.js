const User = require("../Model/User");

const signup = async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "email is already exist, you can login"
            })
        }
        const newUser = await new User({ name, email, password, mobile, address }).save();
        res.status(201).json({ message: "user created successfully", success: true, newUser }).save();
    } catch (error) {
        res.status(500).json({ success: false, message: "internal error" })
    }
}

const login = async (req,res) => {
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
            return res.status(200).json({
                Message: "User not registered",
            });
        }
        const check = password === existingUser.password
        if (!check) {
            return res.status(200).json({ success: false, message: "password is invalid" })
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
        res.status(500).json({success:false, message: "error while login" })

    }
}


module.exports = {signup, login}