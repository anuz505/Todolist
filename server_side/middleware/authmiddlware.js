const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found");
    return res.redirect("/login");
  }

  jwt.verify(token, "Anuj Secret key", (err, decodedToken) => {
    if (err) {
      console.log("JWT verification error:", err); // See what error is being thrown
      res.redirect("/login");
    } else {
      console.log("Decoded token:", decodedToken); // Check what is being decoded
      next();
    }
  });
};

module.exports = requireAuth;
