const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    secondaryPhone: { type: Number },
    languages: { type: String },
    currency: { type: String },
    password: {
        type: String,
        select: false,
    },
    buyerAddress: { type: {
        country: {name: String, code: String},
        state: {name: String, tax: Number},
        city: String,
        address: String,
    }},
    role: { type: String, enum: ['buyer', 'seller', 'admin'], default: "buyer" },
    sellerId: { type: mongoose.Schema.ObjectId, ref: "Seller" },
    googleId: { type: String },
    facebookId: { type: String },
    userStatus: { type: String, enum: ['Active', 'Blocked'], default: "Active" },
    verified: { type: Boolean, default: false },
    
    verifyEmailToken: String,
    verifyEmailExpire: Date,

    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {
        timestamps: true
    }
)

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + process.env.RESET_PASSWORD_EXPIRY * 60 * 1000;

    return resetToken;
};


module.exports = mongoose.model("User", userSchema);