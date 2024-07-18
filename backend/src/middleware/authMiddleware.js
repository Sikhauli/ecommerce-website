const JWT = require('jsonwebtoken');
const { USERS } = require("../utils/constants");

const adminAuthentication = (req, res, next) => {
  try {
    const { TAST } = req.cookies;
 console.log("TAST:", TAST);
    if (!TAST) return res.status(401).send("Access denied.");

    // Verify token
    JWT.verify(TAST, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.status(403).send("Access denied!");

     console.log("Decoded JWT:", decoded);

      if (decoded.userType !== USERS.ADMIN)
        return res.status(401).send("Access Denied. Unauthorized user.");

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const customerAuthentication = (req, res, next) => {
  try {
    const { TAST } = req.cookies;
    console.log("TAST:", TAST);

    if (!TAST) return res.status(401).send("Access denied.");

    // Verify token
    JWT.verify(TAST, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) return res.status(403).send("Access denied!");

      console.log("Decoded JWT:", decoded);


      // Check for both customer and admin roles
      if (decoded.userType !== USERS.CUSTOMER && decoded.userType !== USERS.ADMIN)
        return res.status(401).send("Access Denied. Unauthorized user.");

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  adminAuthentication,
  customerAuthentication
};
