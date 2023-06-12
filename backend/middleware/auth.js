const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
let x = 1;

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {
    const { token } = req.cookies;
    console.log(x++);


    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
}) 

exports.authorizeUser = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403)
        }

        next();
    }
}