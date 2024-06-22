const bcrypt = require("bcrypt");
const { verify } = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../constants");
const saltRounds = 10;
// import axios from 'axios';

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) return res.sendStatus(401);
  verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const formattingDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString();
};

module.exports = {
  hashPassword,
  comparePassword,
  authenticateToken,
  formattingDate,
};
