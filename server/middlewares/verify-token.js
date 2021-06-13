const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  let cheakBearer = "Bearer ";

  if (token) {
    if (token.startsWith(cheakBearer)) {
      token = token.slice(cheakBearer.length, token.length);
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: "Failed to authenticate",
        });
      } else {
        // decoded is actual is the User
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: "No token Provided",
    });
  }
};
