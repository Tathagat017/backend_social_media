const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  //console.log("Auth reached");
  //console.log(req.headers.authorization);
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token, "key", function (err, decoded) {
      if (decoded) {
        console.log(decoded);
        req.body["authorId"] = decoded.authorId;
        next();
      } else {
        res.status(403).send({ message: "Incorrect access token" });
      }
    });
  } else {
    res.status(401).send({ message: "Please login to access posts" });
  }
};

module.exports = { Auth };
