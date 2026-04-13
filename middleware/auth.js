const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, "my_secret_key");
    req.user = decoded;
    next(); // IMPORTANT
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;