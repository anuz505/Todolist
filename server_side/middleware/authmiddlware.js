const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found");
    return res.redirect("/");
  }

  jwt.verify(token, "Anuj Secret key", (err, decodedToken) => {
    if (err) {
      console.log("JWT verification error:", err.message); // Log the error message
      res.status(401).json({ message: "not Authenticated" });
      return res.redirect("/");
    } else {
      res.locals.user = decodedToken; // Store the entire decoded token in res.locals.user
      console.log("Decoded token:", res.locals.user); // Log the decoded token
      next();
    }
  });
};

const addUserToBody = (req, res, next) => {
  req.body.user = res.locals.user.id;
  next();
};

module.exports = { requireAuth, addUserToBody };
