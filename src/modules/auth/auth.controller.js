import userModel from "../../../DataBase/models/user.model.js";
import catchAsynErr from "../../middlewares/catchAsyncErr.js";
import {
  html_emailVerify,
  html_resetPassword,
} from "../../nodemailer/email.html.js";
import sendEmail from "../../nodemailer/email.user.js";
import AppErr from "../../utils/AppErr.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = catchAsynErr(async (req, res, next) => {
  console.log({ message: req.body });
  const isExist = await userModel.findOne({ email: req.body.email });
  if (isExist) next(new AppErr("Email already existed", 409));
  const hash = bcrypt.hashSync(req.body.password, 8);
  if (!hash) return next(new AppErr("Failed to hash password"));
  const user = new userModel({ ...req.body, password: hash });
  user.statue = "default_verify";
  await user.save();
  if (!user) return next(new AppErr("failed to signup", 411));
  const { firstName, lastName, email } = req.body;
  sendEmail({
    id: user._id,
    firstName,
    lastName,
    email,
    message: html_emailVerify,
    subj: "Verify Email Alert! 📩",
  });
  res.status(200).json({ message: "Check you email to verify your account" });
});
export const verify = catchAsynErr(async (req, res, next) => {
  const { token, statue, _id } = req.body;
  console.log(token);
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  if (!decode) return next(new AppErr("Failed to decode token", 400));
  console.log(decode.email);
  const user = await userModel.findOneAndUpdate(
    { email: decode.email, _id, statue },
    { isVerified: true, statue: "staible" },
    { new: true }
  );
  if (!user) return next(new AppErr("failed to verify email", 401));
  if (user.isVerified)
    return res.status(200).json({ message: "Email Successfully verified" });
});
export const signin = catchAsynErr(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppErr("Email and Password incorrect", 400));
  if (!user.isVerified) return next(new AppErr("Verify your email First", 401));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppErr("incorrect password", 400));
  let token = jwt.sign(
    {
      id: user._id,
      email: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.SECRET_KEY
  );
  if (!token) return next(new AppErr("Failed to sign token", 400));
  user.status = "staible";
  await user.save();
  res.status(200).json({ message: "Done", token });
});
export const forgotPassword = catchAsynErr(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppErr("Please enter correct email to reset your password", 400)
    );
  const random = Math.random();
  const code = Math.floor(random * (999999 - 100000 + 1) + 100000);
  user.code = `${code}`;
  user.statue = "default_recover";
  await user.save();
  const { firstName, lastName, email } = user;
  const url = await sendEmail({
    id: user._id,
    firstName,
    lastName,
    email,
    message: html_resetPassword,
    subj: "Reset your Password! 📩",
    code,
    type: "reset",
  });

  res.status(200).json({
    message: "Check your email to change your password",
    code,
    url,
  });
});
export const CheckPasswordCode = catchAsynErr(async (req, res, next) => {
  const { token, statue, _id, code } = req.body;
  console.log(code);
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decode);
  if (!decode) return next(new AppErr("Failed to decode token", 400));
  const checkStatue = await userModel.findOne({
    _id,
    email: decode.email,
    code,
  });
  console.log(checkStatue);
  if (checkStatue?.statue === "default_update")
    return next(
      new AppErr(
        "we already confirmed your code , check your email to update your password",
        401
      )
    );
  const checkuser = await userModel.findOneAndUpdate(
    {
      _id,
      statue,
      email: decode.email,
      code,
    },
    { statue: "default_update" },
    { new: true }
  );
  if (!checkuser) return next(new AppErr("Invalid code", 401));
  res.status(200).json({ message: "Done" });
});
export const updatePassword = catchAsynErr(async (req, res, next) => {
  const { _id, code, token, statue, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  const user = await userModel.findOneAndUpdate(
    {
      _id,
      code,
      token,
      statue,
    },
    { password: hash, statue: "staible", $unset: { code: "" } },
    { new: true }
  );
  if (!user) return next(new AppErr("Failed to update password", 400));
  res.status(200).json({ message: "Password updated successfully" });
});
