const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//handling errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }
  //incorrect passowrds and email
  if (err.message === "incorrect email") {
    errors.email = "incorrect email";
    return errors;
  }
  if (err.message === "incorrect password") {
    errors.password = "incorrect password";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
//jwt function
const createToken = (id) => {
  return jwt.sign({ id }, "Anuj Secret key", {
    expiresIn: maxAge,
  });
};

const post_signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge });
    res.status(201).json({ user });
  } catch (error) {
    const Errors = handleErrors(error);
    res.status(400).json({ Errors });
  }
};
const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ userid: user._id });
  } catch (error) {
    const Errors = handleErrors(error);

    res.status(400).json({ Errors });
  }
};
const get_logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
module.exports = {
  post_signup,
  login_post,
  get_logout,
};
