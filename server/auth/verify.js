const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const token = req.headers?.authorization;

  try {
    const user = jwt.verify(token, process.env.JWT);
    req.user = user;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "NOT AUTHORIZED" });
    return;
  }
};

module.exports = verify;
