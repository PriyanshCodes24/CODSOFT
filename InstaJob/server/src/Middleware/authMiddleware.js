const jwt = require("jsonwebtoken");

const protected = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized,token missing. Login to continue",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Not authorized,token invalid. Login to continue",
    });
  }
};

module.exports = protected;
