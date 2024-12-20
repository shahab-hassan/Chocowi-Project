const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const passport = require("passport");

const userModel = require("../models/userModel")
const sendToken = require("../utils/sendToken")
const sendEmail = require("../utils/sendEmail");
const { verificationEmail, welcomeEmail } = require("../utils/emailTemplates");

const validateUsername = async (username, res) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(username)) {
        res.status(400);
        throw new Error("Username should start with an alphabet, and can contain only letters, numbers, and underscores (_)");
    }
    else if (username.length >= 17) {
        res.status(400);
        throw new Error("Username should not exceed 16 characters!");
    }
};

exports.getUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id).populate("sellerId");
    if (!user) {
        res.status(404)
        throw new Error("User not found!");
    }
    return res.status(200).json({ success: true, user });
})

exports.getAllUsers = asyncHandler(async (req, res) => {
    const { filterType } = req.query;
    let query = {};

    if (filterType === 'Active') query.userStatus = 'Active';
    else if (filterType === 'Blocked') query.userStatus = 'Blocked';

    const allUsers = await userModel.find(query).populate('sellerId').sort({ updatedAt: -1 });
    res.status(200).json({ success: true, allUsers });
})

exports.registerUser = asyncHandler(async (req, res) => {

    let { username, email, password, confirmPassword, country, state, city, address, phone, secondaryPhone, languages, currency } = req.body;

    if (!username || !email || !password || !confirmPassword || !country || !state || !city || !address || !phone || !languages || !currency) {
        res.status(400)
        throw new Error("All fields are required!")
    }

    await validateUsername(username, res)

    if (await userModel.findOne({ username })) {
        res.status(400)
        throw new Error("Username already taken!")
    }
    const checkEmailExist = await userModel.findOne({ email });
    if (checkEmailExist) {
        if (checkEmailExist.verified) {
            res.status(400)
            throw new Error("Email is already registered!")
        }
        else {
            res.status(400)
            throw new Error("Email is already registered but not Verified... Please verify!")
        }
    }
    if (password.length < 8) {
        res.status(400)
        throw new Error("Use 8 or more characters with a mix of letters, numbers & special characters!")
    }

    if (password !== confirmPassword) {
        res.status(400)
        throw new Error("Passwords do not match...")
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username, email, password: hashPassword, buyerAddress: {
            country,
            state,
            city,
            address
        }, phone, secondaryPhone, languages, currency: currency.value
    });

    const verifyToken = crypto.randomBytes(20).toString("hex");
    newUser.verifyEmailToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
    newUser.verifyEmailExpire = Date.now() + 30 * 60 * 1000;

    await newUser.save();

    const verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/verifyEmail/${verifyToken}`;

    await sendEmail({
        to: newUser.email,
        subject: "Verify your Email - Chocowi",
        text: verificationEmail(verifyUrl),
    });

    res.status(201).json({
        success: true,
        newUser
    })
})

exports.loginUser = asyncHandler(async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are Required!")
    }

    let user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        res.status(401)
        throw new Error("Email is not registered...")
    }

    if (user.userStatus === 'Blocked') {
        res.status(403)
        throw new Error("Your account has been blocked!");
    }

    if (!user.verified) {
        res.status(403)
        throw new Error("Email not Verified");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        res.status(401)
        throw new Error("Incorrect email or password!");
    }

    sendToken(user, res);

})

exports.updateUser = asyncHandler(async (req, res) => {
    const userId = req.user._id; // From authorized middleware
    const { 
        username, 
        phone, 
        secondaryPhone, 
        languages, 
        currency, 
        country, 
        state, 
        city, 
        address 
    } = req.body;

    // Validate required fields
    if (!username || !phone || !languages || !currency || !country || !state || !city || !address) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    // Check if username is already taken by another user
    const existingUser = await userModel.findOne({ 
        username, 
        _id: { $ne: userId } 
    });
    
    if (existingUser) {
        res.status(400);
        throw new Error("Username is already taken!");
    }

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
        userId, 
        {
            username,
            phone,
            secondaryPhone,
            languages,
            currency: currency.value || currency,
            buyerAddress: {
                country: {
                    name: country.label || country.name,
                    code: country.value || country.code
                },
                state: {
                    name: state.label || state.name,
                    tax: state.value || state.tax
                },
                city,
                address
            }
        }, 
        { new: true }
    );

    res.status(200).json({
        success: true,
        user: updatedUser
    });
});

exports.resetPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found with this email");
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${process.env.frontendHostName}/resetPassword/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message,
        });

        res.status(200).json({ success: true, message: "Email sent" });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(500);
        throw new Error("Email could not be sent");
    }
});

exports.resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid token or token has expired");
    }

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
});

exports.onGoogleLoginSuccess = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: `${process.env.frontendHostName}/signin` }, (err, user, info) => {
        if (err || !user) {
            console.log("err 1", err);
            return res.redirect(`${process.env.frontendHostName}/signin`);
        }
        req.logIn(user, async (err) => {
            if (err) {
                console.log("err 2", err);
                return res.redirect(`${process.env.frontendHostName}/signin`);
            }

            if (!user.verified) {
                user.verified = true;
                await user.save();

                await sendEmail({
                    to: user.email,
                    subject: "Welcome to Chocowi",
                    text: welcomeEmail(user.username),
                });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY });

            const isIncomplete =
                !user.phone ||
                !user.languages ||
                !user.currency ||
                !user.buyerAddress?.country?.name;

            res.redirect(`${process.env.frontendHostName}/signin?token=${token}${isIncomplete ? '&incompleteUser=true' : ''}`);
        });
    })(req, res, next);
}

exports.onFacebookLoginSuccess = (req, res, next) => {
    passport.authenticate('facebook', { failureRedirect: '/signin' }, (err, user, info) => {
        if (err || !user) {
            return res.redirect('/signin');
        }
        req.logIn(user, async (err) => {
            if (err) {
                return res.redirect('/signin');
            }

            if (!user.verified) {
                user.verified = true;
                await user.save();

                await sendEmail({
                    to: user.email,
                    subject: "Welcome to Chocowi",
                    text: welcomeEmail(user.username),
                });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY });

            const isIncomplete =
                !user.phone ||
                !user.languages ||
                !user.currency ||
                !user.buyerAddress?.country?.name;

            res.redirect(`${process.env.frontendHostName}/signin?token=${token}${isIncomplete ? '&incompleteUser=true' : ''}`);
        });
    })(req, res, next);
}

exports.updateEmailAndUsername = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
        res.status(404)
        throw new Error("User not found!")
    }
    await validateUsername(req.body.username, res);

    user.username = req.body.username;
    user.email = req.body.email;
    await user.save();
    res.status(200).json({ success: true, message: 'User updated!' })
})

exports.updatePassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const user = await userModel.findById(userId).select("+password");
    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
        res.status(400);
        throw new Error("Old password is incorrect!");
    }

    if (newPassword !== confirmNewPassword) {
        res.status(400);
        throw new Error("New passwords do not match!");
    }

    if (newPassword.length < 8) {
        res.status(400);
        throw new Error("Password should be at least 8 characters long!");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully!" });
});

exports.blockUser = asyncHandler(async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user)
            return res.status(404).json({ success: false, message: "User not found!" });
        if (!req.body.isBlocked)
            user.userStatus = 'Blocked';
        else
            user.userStatus = 'Active';
        await user.save();
        res.status(200).json({ success: true, message: "User blocked successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

exports.verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
        verifyEmailToken: hashedToken,
        verifyEmailExpire: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired verification token.");
    }

    user.verified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailExpire = undefined;
    await user.save();

    await sendEmail({
        to: user.email,
        subject: "Welcome to Chocowi",
        text: welcomeEmail(user.username),
    });

    res.status(200).json({
        success: true,
        message: "Email verified successfully! You can now Login.",
    });
});

exports.resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("Email not found.");
    }

    if (user.verified) {
        res.status(400);
        throw new Error("Email is already verified.");
    }

    const verifyToken = crypto.randomBytes(20).toString("hex");
    user.verifyEmailToken = crypto.createHash("sha256").update(verifyToken).digest("hex");
    user.verifyEmailExpire = Date.now() + 30 * 60 * 1000;

    await user.save();

    const verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/verifyEmail/${verifyToken}`;

    await sendEmail({
        to: user.email,
        subject: "Verify your Email - Chocowi",
        text: verificationEmail(verifyUrl),
    });

    res.status(200).json({ success: true, message: "Verification email sent!" });
});