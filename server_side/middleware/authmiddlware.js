const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found");
    return res.redirect("/login");
  }

  jwt.verify(token, "Anuj Secret key", (err, decodedToken) => {
    if (err) {
      console.log("JWT verification error:", err.message); // Log the error message
      return res.redirect("/login");
    } else {
      res.locals.user = decodedToken; // Store the entire decoded token in res.locals.user
      console.log("Decoded token:", res.locals.user); // Log the decoded token
      next();
    }
  });
};

const addUserToBody = (req, res, next) => {
  const token1 = req.cookies.jwt;
  if (!token1) {
    console.log("No token found");
    return res.redirect("/login");
  }

  jwt.verify(token1, "Anuj Secret key", (err, decodedToken) => {
    if (err) {
      console.log("JWT verification error:", err.message); // Log the error message
      return res.redirect("/login");
    } else {
      console.log(decodedToken);
      req.body.user = decodedToken.id; // Ensure user ID is added to req.body
      console.log("User added to req.body:", req.body.user); // Log for debugging
      next();
    }
  });
};

module.exports = { requireAuth, addUserToBody };
